import express from "express";
import { loanModel } from "../models/loan.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new loan application
router.post("/create", authenticateToken, async (req, res) => {
  const userId = req.user["id"];
  const { principal, tenure, purpose, totalAmount } = req.body;

  try {
    const newLoan = new loanModel({
      principal,
      tenure,
      purpose,
      totalAmount,
      userId,
    });
    await newLoan.save();
    res
      .status(201)
      .json({ message: "Loan application created", loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: "Error creating loan application", error });
  }
});

// Update loan application status
router.put("/update-status/", authenticateToken, async (req, res) => {
  const userId = req.user["id"];
  const { applicationStatus } = req.body;

  try {
    const updatedLoan = await loanModel.findByIdAndUpdate(
      userId,
      { applicationStatus },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    res
      .status(200)
      .json({ message: "Application status updated", loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

export { router as loanRouter };
