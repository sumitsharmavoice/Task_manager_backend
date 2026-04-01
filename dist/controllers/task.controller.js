"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const task = yield prisma.task.create({
        data: {
            title,
            description,
            userId: req.user.userId,
        },
    });
    res.json(task);
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search = "", status } = req.query;
    const tasks = yield prisma.task.findMany({
        where: Object.assign({ userId: req.user.userId, title: { contains: search } }, (status !== undefined && { status: status === "true" })),
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield prisma.task.findFirst({
        where: { id, userId: req.user.userId },
    });
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    res.json(task);
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    const existing = yield prisma.task.findFirst({
        where: { id, userId: req.user.userId },
    });
    if (!existing)
        return res.status(404).json({ message: "Task not found" });
    const task = yield prisma.task.update({
        where: { id },
        data: Object.assign(Object.assign({}, (title !== undefined && { title })), (description !== undefined && { description })),
    });
    res.json(task);
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existing = yield prisma.task.findFirst({
        where: { id, userId: req.user.userId },
    });
    if (!existing)
        return res.status(404).json({ message: "Task not found" });
    yield prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted" });
});
exports.deleteTask = deleteTask;
const toggleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existing = yield prisma.task.findFirst({
        where: { id, userId: req.user.userId },
    });
    if (!existing)
        return res.status(404).json({ message: "Task not found" });
    const task = yield prisma.task.update({
        where: { id },
        data: { status: !existing.status },
    });
    res.json(task);
});
exports.toggleTask = toggleTask;
