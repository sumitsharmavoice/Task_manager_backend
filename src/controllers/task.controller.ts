import { PrismaClient } from "@prisma/client";
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
    skip: (page - 1) * limit,
    take: Number(limit),
  });

  res.json(tasks);
};