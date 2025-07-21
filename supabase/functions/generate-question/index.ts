// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const apiKey = Deno.env.get("OPEN_API_SECRET");
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
}

Deno.serve(async (req) => {
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


  // Parse body safely
  let name = "Anonymous"
  try {
    const body = await req.json()
    name = body?.name ?? "Anonymous"
  } catch {
    // No JSON body or invalid format
  }

  const data = { message: `generate-question +++ ${name} ${apiKey}!` }

  return new Response(JSON.stringify(data), {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  })
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-question' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
