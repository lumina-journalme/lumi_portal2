import { corsHeaders } from '../_shared/cors.ts';

const MARKDOWN_URLS: Record<string, string> = {
  'privacy-policy': 'https://assets.lumime.ai/privacy_policy_202504.md',
  'terms-of-service': 'https://assets.lumime.ai/term_of_use_202504.md',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type');

    if (!type || !MARKDOWN_URLS[type]) {
      return new Response(
        JSON.stringify({ error: 'Invalid page type' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch(MARKDOWN_URLS[type]);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown content: ${response.status}`);
    }

    const content = await response.text();

    return new Response(
      JSON.stringify({ content }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch markdown content' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});