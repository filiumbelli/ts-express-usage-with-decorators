import { Response, Request, Router, NextFunction } from "express";

export const router = Router();

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(401);
    res.redirect("/login");
}

router.get("/", (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`<div>
            <h2>Welcome back user</h2>
            <a href="/logout">Logout</a>
        </div>`)

    }
    res.send(`<div>
        <h1>Welcome</h1>
        <a href="/login">Login</a>
    </div>`)
});

router.get("/logout", (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        req.session.loggedIn = undefined;
    }
    res.redirect("/");
});


router.get("/protected", requireAuth, (req: Request, res: Response) => {
    res.send(`<div>
        Wow you created a middleware for authorization
    </div>`)
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === 'test@ha.co' && password === 'test') {
        req.session = { loggedIn: true }
        res.redirect("/");
    } else {
        res.send("Invalid credentials")
    }
});


