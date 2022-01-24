import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./controller";
;

export function Use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
    }
}

