// gemini.js
import axios from "axios";

const geminiResponse = async (userInput, assistantName) => {
  if (!userInput) throw new Error("User input is required");
  if (!assistantName) throw new Error("Assistant name is required");

  try {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    // 🔹 Fixed & Enhanced Prompt
    const prompt = `
You are a virtual assistant named "${assistantName}" created by Shubham. 
You are friendly, helpful, and professional. Always refer to yourself as "${assistantName}".
You are not Google. You are a voice-enabled assistant.

Your task:
1. Understand the user's natural language input.
2. Respond with a **short, human-like reply** (for speaking back to the user).
3. Also return a structured **JSON object** describing the action to take.

Format your response strictly as:

{
  "voice_response": "<short natural reply for speech>",
  "action": {
    "type": "general" | "google_search" | "youtube_search" | "youtube_play" | 
             "get_time" | "get_date" | "get_day" | "get_joke" | "get_weather" | 
             "get_news" | "calculator_open" | "instagram_open" | "facebook_open" | 
             "file_open" | "system_command",
    "user_input": "<original user input (without assistant name)>"
  }
}

Rules:
- If the user says "open" or "play" something (like "open calculator", "play YouTube video"), map it to the correct action type.
- For file or system commands (like "open C:/Users/Shubham/Documents/file.txt"), set type = "file_open" and include the path in user_input.
- For Google or YouTube searches, remove "${assistantName}" from the query.
- Keep "voice_response" short and natural (like "Sure, opening calculator!" instead of long explanations).

now your userInput- ${prompt}
`;

    const response = await axios.post(
      `${apiUrl}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt + "\n\nUser: " + userInput }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Extract text only
    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return text;
  } catch (error) {
    console.error(
      "Error fetching Gemini response:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error?.message || "Gemini API error");
  }
};

export default geminiResponse;
