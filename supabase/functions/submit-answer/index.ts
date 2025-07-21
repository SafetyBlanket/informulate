// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js"
import OpenAI from "jsr:@openai/openai"

const openai = new OpenAI({ apiKey: Deno.env.get("OPEN_AI_KEY") });
const supabase_url = Deno.env.get("DB_URL");
const supabase_anon_key = Deno.env.get("DB_ANON_KEY")
const supabase = createClient(supabase_url, supabase_anon_key);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

Deno.serve(async (req) => {
  try {
    const { method } = req;

    // Only process "Options", "GET" requests...
    switch(method) {
      case "OPTIONS":
        return new Response(null, { status: 204, headers });
      case "POST":
        break;
      default:
        return new Response(null, { status: 501, headers });
    }

    const { question, answer } = await req.json();

    if (!question || !answer) {
      return new Response(null, { status: 400, headers });
    }

    const prompt = `
      You are a quiz judge that always returns JSON.  You are presented with a question and and answer and determine if it is correct and provide a brief explanation why.
      You will respond in the following format:
        {
          "correct": boolean,
          "explanation": string
        }
      The question is: "${question}".
      The provided answer is: "${answer}.
    `;

    const response = await openai.responses.create({
      model: 'gpt-4.1',
      input: prompt,
    });

    const responseText = JSON.parse(response.output_text);
    console.log(responseText);

    const { data, error } = await supabase
      .from('trivia')
      .insert([
        { question, answer, is_correct: responseText.correct },
      ])
      .select();
    console.log('query response:', { data, error });

    return new Response(JSON.stringify(responseText), {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500, headers });
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/submit-answer' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
