import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/taskroutes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(5197, () => {
  console.log("Server running on port 5197");
});