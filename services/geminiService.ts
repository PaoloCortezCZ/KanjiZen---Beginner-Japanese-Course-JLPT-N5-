import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-2.5-flash';

// --- System Instructions ---
const SENSEI_INSTRUCTION = `
You are "Sensei" (Teacher), a wise and encouraging Japanese language tutor specifically for European beginners preparing for the **JLPT N5 Exam**.

Your Goal:
1. Help the student pass the JLPT N5.
2. Explain Kanji simply using visual mnemonics.
3. Focus on specific N5 grammar and vocabulary.

Guidelines:
- When asked about a Kanji, explain its meaning, stroke order logic, and give 1 common N5 vocabulary word using it.
- If the user asks for a quiz, give them a question formatted like the actual JLPT (e.g., "How do you read this?", "Which Kanji fits this sentence?").
- Use simple English.
- Be encouraging. 
- If the user asks about pronunciation, describe the sound using European phonetic approximations if helpful.
`;

export const createSenseiChat = (): Chat => {
  return ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: SENSEI_INSTRUCTION,
      temperature: 0.7,
    }
  });
};

export const generateMnemonic = async (character: string, meaning: string): Promise<string> => {
  try {
    const prompt = `Give me a short, memorable, visual mnemonic or story for the Japanese Kanji "${character}" which means "${meaning}". 
    Keep it under 30 words. Focus on the shape of the character to help recall.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text || "Sensei is meditating on this character...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not retrieve wisdom at this moment.";
  }
};

export const generateQuizQuestion = async (knownKanji: string[]): Promise<string> => {
    try {
        const kanjiString = knownKanji.join(', ');
        const prompt = `Create a JLPT N5 style multiple choice quiz question using one of these Kanji: [${kanjiString}].
        Format strictly as JSON:
        {
          "kanji": "The kanji being tested",
          "question": "The question text (e.g. 'Select the correct reading for this character' or 'Fill in the blank')",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "The correct option string",
          "explanation": "Brief explanation of the answer and why others are wrong."
        }`;

        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        return response.text || "{}";
    } catch (error) {
        console.error("Quiz Gen Error", error);
        return "{}";
    }
}