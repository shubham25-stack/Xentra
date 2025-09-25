import getToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax", // ✅ changed from "strict" to "lax" for cross-port frontend
      secure: false, // set true in production with HTTPS
    });

    const { password: _, ...userData } = user._doc;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData, // return user so frontend can use directly
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    const { password: _, ...userData } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Logout failed", error: error.message });
  }
};
