import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    principal: { type: Number, required: true },
    tenure: { type: Number, required: true },
    purpose: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    applicationStatus: { type: String, default: "Pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const loanModel = mongoose.model("Loan", loanSchema);

export { loanModel };