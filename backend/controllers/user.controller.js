import User from "../models/backend/models/user.model.js";
 

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the token in isAuth middleware
    // Fetch user data from the database using userId
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
