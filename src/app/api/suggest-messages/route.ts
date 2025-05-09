// app/api/generate-questions/route.ts

export const runtime = 'edge';

export async function POST(req: Request) {
  const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.confidentialfeedback.online', // ✅ Use your actual domain
      'X-Title': 'Anonymous Chat Generator',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-prover-v2:free',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: false,
    }),
  });

  const data = await response.json();
  //console.log('OpenRouter Response:', data); // Debugging log

  if (response.ok) {
    let output = data.choices?.[0]?.message?.content || '';

    // ✅ Strip code block formatting like ```plaintext\n...\n```
    output = output.replace(/```[\s\S]*?\n([\s\S]*?)```/, '$1').trim();

    return new Response(output, { status: 200 });
  } else {
    console.error('OpenRouter Error:', data);
    console.log(data)
    return new Response(JSON.stringify(data), { status: response.status });
  }
}
