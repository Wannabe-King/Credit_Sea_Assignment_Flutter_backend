import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/auth.js";
import { loanRouter } from "./routes/loan.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/loan", loanRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
