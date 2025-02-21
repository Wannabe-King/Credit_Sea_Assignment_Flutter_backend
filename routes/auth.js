import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const userRouter = Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

userRouter.post("/signup", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required." });
  }

  try {
    const existingUser = await userModel.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Phone number already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ phoneNumber, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

userRouter.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required." });
  }

  try {
    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password." });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

userRouter.put("/update/:phoneNumber", authenticateToken, async (req, res) => {
  const { phoneNumber } = req.params;
  const { firstName, lastName, gender, maritialStatus, dob, otp, email, pan } =
    req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { phoneNumber },
      {
        $set: {
          firstName,
          lastName,
          gender,
          maritialStatus,
          dob,
          otp,
          email,
          pan,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User details updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

export { userRouter };
