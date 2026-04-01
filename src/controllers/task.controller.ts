import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const createTask = async (req: any, res: any) => {
  const { title, description } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: req.user.userId,
    },
  });

  res.json(task);
};

export const getTasks = async (req: any, res: any) => {
  const { page = 1, limit = 10, search = "", status } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      userId: req.user.userId,
      title: { contains: search },
      ...(status !== undefined && { status: status === "true" }),
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  res.json(tasks);
};

export const getTaskById = async (req: any, res: any) => {
  const { id } = req.params;

  const task = await prisma.task.findFirst({
    where: { id, userId: req.user.userId },
  });

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

export const updateTask = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const existing = await prisma.task.findFirst({
    where: { id, userId: req.user.userId },
  });

  if (!existing) return res.status(404).json({ message: "Task not found" });

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
    },
  });

  res.json(task);
};

export const deleteTask = async (req: any, res: any) => {
  const { id } = req.params;

  const existing = await prisma.task.findFirst({
    where: { id, userId: req.user.userId },
  });

  if (!existing) return res.status(404).json({ message: "Task not found" });

  await prisma.task.delete({ where: { id } });

  res.json({ message: "Task deleted" });
};

export const toggleTask = async (req: any, res: any) => {
  const { id } = req.params;

  const existing = await prisma.task.findFirst({
    where: { id, userId: req.user.userId },
  });

  if (!existing) return res.status(404).json({ message: "Task not found" });

  const task = await prisma.task.update({
    where: { id },
    data: { status: !existing.status },
  });

  res.json(task);
};