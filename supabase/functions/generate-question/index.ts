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
  "Access-Control-Allow-Methods": "GET, OPTIONS",
}

const getPreviousQuestions = async (): Array<{ question: string }> => {
  const questions = await supabase.from("trivia").select('question');
  return questions.data;
}

Deno.serve(async (req) => {
  try {
    const { method } = req;

    // Only process "Options", "GET" requests...
    switch(method) {
      case "OPTIONS":
        return new Response(null, { status: 204, headers });
      case "GET":
        break;
      default:
        return new Response(null, { status: 501, headers });
    }

    const previousQuestions = await getPreviousQuestions();
    const prompt = `
      You are a quiz generator that always returns JSON. Return your answer in the following format: 
        {
          "question": string,
          "choices": string[]
        }
      There should be between 3-4 choices that are plausible answers.
      The question should NOT be one of the following questions: ${previousQuestions.map(q => q.question).join(', ')}
    `;

    const response = await openai.responses.create({
      model: 'gpt-4.1',
      input: prompt,
      temperature: 0.8, // Get some variability
    });

    const responseText = JSON.parse(response.output_text);
    console.log(response.output_text);

    return new Response(JSON.stringify({ ...responseText }), {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500, headers });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-question' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
