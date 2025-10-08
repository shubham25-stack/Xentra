import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import geminiResponse from "../gemini.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAssistant = async (req, res) => {
  try {
    const { assistantName } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let assistantImage;

    if (req.file) {
      const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "assistantImages",
      });
      assistantImage = uploadedResponse.secure_url;

      // Delete the local file after uploading to Cloudinary
      fs.unlinkSync(req.file.path);
    }

    // Find the user and update the assistant image
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { assistantImage: assistantImage, assistantName: assistantName },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Assistant image updated successfully",
      assistantImage: updatedUser.assistantImage,
    });
  } catch (error) {
    console.error("updateAssistant error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAssistantName = async (req, res) => {
  try {
    const { assistantName } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user and update the assistant name
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { assistantName: assistantName },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Assistant name updated successfully",
      assistantName: updatedUser.assistantName,
    });
  } catch (error) {
    console.error("updateAssistantName error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userName = user.name;
    const assistantName = user.assistantName;

    // Get response from Gemini
    const resultText = await geminiResponse(command, userName, assistantName);

    // Parse JSON from Gemini response
    let gemResult;
    try {
      gemResult = JSON.parse(resultText);
    } catch (err) {
      return res.status(500).json({ message: "Unable to parse Gemini response" });
    }

    const { type, user_input } = gemResult;

    // Handle action types
    let actionResult = null;
    switch (type) {
      case "general":
        actionResult = { text: user_input };
        break;

      case "google_search":
        actionResult = { url: `https://www.google.com/search?q=${encodeURIComponent(user_input)}` };
        break;

      case "youtube_search":
      case "youtube_play":
        actionResult = { url: `https://www.youtube.com/results?search_query=${encodeURIComponent(user_input)}` };
        break;

      case "get_time":
        actionResult = { text: new Date().toLocaleTimeString() };
        break;

      case "get_date":
        actionResult = { text: new Date().toLocaleDateString() };
        break;

      case "get_day":
        actionResult = { text: new Date().toLocaleDateString("en-US", { weekday: "long" }) };
        break;

      case "get_joke":
        actionResult = { text: "Why did the scarecrow win an award? Because he was outstanding in his field!" };
        break;

      case "get_weather":
        actionResult = { text: "Fetching weather for: " + user_input }; // integrate API later
        break;

      case "get_news":
        actionResult = { url: `https://news.google.com/search?q=${encodeURIComponent(user_input)}` };
        break;

      case "calculator_open":
        actionResult = { text: "Calculator command received" }; // implement child_process in backend if needed
        break;

      case "instagram_open":
        actionResult = { url: "https://www.instagram.com/" };
        break;

      case "facebook_open":
        actionResult = { url: "https://www.facebook.com/" };
        break;

      case "file_open":
        actionResult = { text: "File open command received: " + user_input };
        break;

      case "system_command":
        actionResult = { text: "System command received: " + user_input };
        break;

      default:
        actionResult = { text: "Unknown action type" };
    }

    return res.status(200).json({ success: true, action: actionResult });

  } catch (error) {
    console.error("askToAssistant error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { getCurrentUser, updateAssistant, updateAssistantName };
