import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User created successfully: ${newUser.email}` });
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: `User ${email} not found` });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password, {expiresIn: "1h"});
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET);
    return res.status(200).json({token: token, user: {email: user.email, role: user.role}});
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}