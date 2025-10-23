addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" }});
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: "Only POST" }), { status: 405, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }});
  }
  try {
    const { text, target } = await request.json();
    if (!text || !target) {
      return new Response(JSON.stringify({ error: "Missing text or target" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }});
    }

    const langNames = { fr: "French", es: "Spanish", ja: "Japanese" };
    const targetName = langNames[target] || target;

    const prompt = `You are a professional translator. Translate the following text precisely into ${targetName}. Keep punctuation and capitalization. Output only the translation (no explanations).

Text:
"""${text}"""`;

    const OPENAI_KEY = OPENAI_API_KEY;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 400
      })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return new Response(JSON.stringify({ error: "OpenAI error", details: txt }), { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }});
    }

    const data = await resp.json();
    const translation = data.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ translation }), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }});

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }});
  }
}