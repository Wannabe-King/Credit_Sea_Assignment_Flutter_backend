import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    gender: { type: String, default: "" },
    maritialStatus: { type: String, default: "" },
    dob: { type: String, default: "" },
    otp: { type: String, default: "" },
    email: { type: String, default: "" },
    pan: { type: String, default: "" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export { userModel };
