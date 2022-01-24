import { NextFunction, Request, RequestHandler, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { RequestType } from "./routes";
export enum MetadataKeys {
    path = "path",
    method = "method",
    middleware = "middleware",
    validator = "validator",
}
const router = AppRouter.getInstance();

function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send(`<div>Invalid Request</div>`);
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send("error");
                return;
            }
        }
        next();
    }
}

/**
 * 
 * @param prefix root path for the specific controller
 */
export function Controller(prefix?: string) {
    return function (target: Function) {
        for (let key in target.prototype) {
            const routeHandlerMethod: () => void = target.prototype[key]
            const path: string = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: RequestType = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const bodyProperties = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key);

            if (path && method) {
                const url = `${prefix || ""}${path}`
                const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []
                if (bodyProperties) {
                    const validator = bodyValidators(bodyProperties);
                    router[method](url, ...middlewares, validator, routeHandlerMethod);
                }
                router[method](url, ...middlewares, routeHandlerMethod);
            }
        }
    }
}

