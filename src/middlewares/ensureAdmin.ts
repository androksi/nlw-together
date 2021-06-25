import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { userId } = req
    const usersRepositories = getCustomRepository(UsersRepositories)
    const { admin } = await usersRepositories.findOne(userId)

    if (admin) {
        return next();
    }
    return res.status(404).json({ error: "You are not an administrator." });
}