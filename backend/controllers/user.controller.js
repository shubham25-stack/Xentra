import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

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

export { getCurrentUser, updateAssistant, updateAssistantName };
