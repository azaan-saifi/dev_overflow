import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { question } = await request.json();

  try {
    const response = await fetch("https://meta-llama-3-8b.p.rapidapi.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": `${process.env.RAPID_API_HOST}`,
        "x-rapidapi-key": `${process.env.META_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          {
            role: "system",
            content:
              "You are an allrounder, helpful and so much funny assistant with people while answering their queries.",
          },
          {
            role: "user",
            content: `${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
