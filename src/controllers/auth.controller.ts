import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.json({ accessToken, refreshToken });
};