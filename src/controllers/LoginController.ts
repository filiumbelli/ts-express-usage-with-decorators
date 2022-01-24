import { Request, Response, Router } from "express";
import { Get, Post } from "./decorators/routes";
import { Controller } from "./decorators/controller";
import { bodyValidator } from "./decorators";

@Controller("/auth")
class LoginController {
    @Get("/login")
    getLogin(req: Request, res: Response): void {
        req.session && req.session.loggedIn ? res.redirect("/") :
            res.send(`
            <form method="POST">
                <div>
                    <label>Username</label>
                    <input name="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password"/>
                </div>
                <button>Submit</button>
            </form>`)
    }

    @bodyValidator("username","password")
    @Post("/login")
    postLogin(req: Request, res: Response): void {
        
        const username = req.body.username;
        const password = req.body.password;
        
        if (username === 'test' && password === 'test') {
            if (req.session) {
                req.session.loggedIn = true;
            }
            res.redirect("/");
        } else {
            res.send(`<div>
                <h3>Wrong Credentials</h3>
                <a href="/auth/login">Try Again</a>
            </div>`)
        }
    }

    @Get("/logout")
    getLogout(req: Request, res: Response) {
        req.session = undefined
        res.redirect("/");
    }

}