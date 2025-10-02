
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Extracts text from a given image using the Gemini model.
 * @param base64Data The base64 encoded image data.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @returns A promise that resolves to the extracted text.
 */
export const extractTextFromImage = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    };

    const textPart = {
      text: "Perform OCR on this image. Extract all text content accurately. If there is Arabic text, extract it as is."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error during text extraction:", error);
    throw new Error("Failed to extract text from the image.");
  }
};

/**
 * Translates a given block of Arabic text to English.
 * @param text The Arabic text to translate.
 * @returns A promise that resolves to the English translation.
 */
export const translateArabicToEnglish = async (text: string): Promise<string> => {
  try {
    const prompt = `Translate the following Arabic text into English. Ensure the translation is accurate and natural. Provide only the translated English text without any additional commentary or phrases like "Here is the translation:".

Arabic Text:
"${text}"
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("Failed to translate the text.");
  }
};
