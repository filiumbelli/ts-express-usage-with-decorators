import { Router } from "express";

export class AppRouter {
    private static instance: Router = Router();

    static getInstance() {
        return this.instance;
    }
}

