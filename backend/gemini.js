// gemini.js
import axios from "axios";

const geminiResponse = async (prompt) => {
  if (!prompt) throw new Error("Prompt is required");

  try {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await axios.post(
      `${apiUrl}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Extract clean text from Gemini
    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return { raw: response.data, text };
  } catch (error) {
    console.error(
      "Error fetching Gemini response:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error?.message || "Gemini API error");
  }
};

export default geminiResponse;
