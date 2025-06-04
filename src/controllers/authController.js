import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

export const signupController = async (req, res) => {

  try {
    const { email, password, role } = req.body || {};

    if (!email || !password || !role) {
      return sendError(res, 400, "Email, password, and role are required.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 409, `User with email ${email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return sendError(res, 500, "Internal server error");
  }
};

export const loginController = async (req, res) => {

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 404, `User with email ${email} not found.`);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return sendError(res, 401, "Invalid credentials.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return sendError(res, 500, "Internal server error");
  }
};
