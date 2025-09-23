import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    assistantImage: {
      type: String,
      default: "",
    },
    assistantName: {
      type: String,
      default: "",
      trim: true,
      maxLength: [50, "Assistant name cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;