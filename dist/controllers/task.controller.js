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
exports.getTasks = exports.createTask = void 0;
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
        skip: (page - 1) * limit,
        take: Number(limit),
    });
    res.json(tasks);
});
exports.getTasks = getTasks;
