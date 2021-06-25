import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(401).end()
    }
    
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "e26daea96a8e3fabfa24750b5a4c6956") as IPayload
        req.userId = sub
        return next()
    } catch (err) {
        return res.status(401).end()
    }
}