import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

export default app;
