import { NextFunction, Request, Response } from "express";

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(401).send(`<div>
        Unauthorized user.
        </div>
        <div>
        <a href="/auth/login">Login</a>
    </div>`)
}