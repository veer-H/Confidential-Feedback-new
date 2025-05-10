export const runtime = 'edge';

export async function POST(req: Request) {
  const prompt = `Create exactly three open-ended, engaging, and universal questions, separated by "||" in a single line of text. Avoid any code blocks, quotes, or markdown formatting. The questions should be general, suitable for an anonymous social messaging platform like Qooh.me, and must encourage positive, friendly interaction. The format should be: 

Question 1||Question 2||Question 3`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.confidentialfeedback.online',
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

  if (response.ok) {
    let output = data.choices?.[0]?.message?.content || '';
    console.log('OpenRouter Response:', output);
    // Attempt to extract from code block if present
    const codeBlockMatch = output.match(/```(?:plaintext)?\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      output = codeBlockMatch[1].trim();
    } else {
      output = output.trim();
    }

    // Fallback if model output is bad
    if (!output || !output.includes('||')) {
      output =
        "What's your favorite way to relax?||What's something new you’ve learned recently?||If you could live anywhere in the world, where would it be?";
    }

    return new Response(output, { status: 200 });
  } else {
    console.error('OpenRouter Error:', data);
    return new Response(JSON.stringify(data), { status: response.status });
  }
}
