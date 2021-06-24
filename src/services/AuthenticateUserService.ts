import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne({ email });
        if (!user) {
            throw new Error("E-mail/Password incorrect.");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("E-mail/Password incorrect.")
        }

        const token = sign({
            email: user.email
        }, "e26daea96a8e3fabfa24750b5a4c6956", {
            subject: user.id,
            expiresIn: "1d"
        });
        return token
    }
}

export { AuthenticateUserService }