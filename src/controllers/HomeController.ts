import { Controller } from "./decorators/controller";
import { Request, Response } from "express";
import { Use } from "./decorators/middleware";
import { authRequired } from "../middlewares/auth/Auth";
import { Get } from "./decorators";
@Controller()
class HomeController {

    @Get("/")
    getHomePage(req: Request, res: Response): void {
        res.send(`<div>
                <h2>Welcome</h2>
                <a href="/private">Priviet</a>
            </div>`);
    }

    @Use(authRequired)
    @Get("/private")
    getPrivatePage(req: Request, res: Response) {
        res.send(`<div>
            Only accessible for priviet users.
            Just like you !!!!.
            <br>
            <a href="/">Go home</a>
        </div>`)
    }
}