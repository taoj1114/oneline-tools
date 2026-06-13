export interface Env {
  ASSETS: Fetcher;
  AI: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // API Routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    }

    // Otherwise, serve static assets
    return env.ASSETS.fetch(request);
  },
};

async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/api/hello') {
    return new Response(JSON.stringify({ message: 'Hello from OneLine Tools Worker!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (url.pathname === '/api/ai/regex' && request.method === 'POST') {
    try {
      const { prompt } = await request.json() as { prompt: string };
      
      const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { role: 'system', content: 'You are a regex expert. Generate a regular expression based on the user description. Provide only the regex pattern and a brief explanation. Format your response as JSON with "regex" and "explanation" keys.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      });

      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Not Found', { status: 404 });
}
