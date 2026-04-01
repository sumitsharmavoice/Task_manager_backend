import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/taskroutes";


dotenv.config();

const PORT = Number(process.env.PORT || 5197);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});