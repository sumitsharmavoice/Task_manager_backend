"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const taskroutes_1 = __importDefault(require("./routes/taskroutes"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT || 5197);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://taskmanagerfrontend-eta.vercel.app/",
}));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use("/tasks", taskroutes_1.default);
app.get("/", (req, res) => {
    res.send("API running...");
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
