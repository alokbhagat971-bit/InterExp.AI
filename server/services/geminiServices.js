import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { setGlobalDispatcher, Agent } from "undici";

// Force IPv4 - fixes UND_ERR_CONNECT_TIMEOUT on networks where
// the IPv6 route to generativelanguage.googleapis.com is broken/blackholed
setGlobalDispatcher(new Agent({ connect: { family: 4 } }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAi = async (messages) => {
  try {
    if (!messages || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    const prompt = messages
      .map((msg) => `${msg.role.toUpperCase()}:\n${msg.content}`)
      .join("\n\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error(err);
    throw new Error("Gemini API Error");
  }
};