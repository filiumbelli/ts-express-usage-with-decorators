import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./controller";

interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

export enum RequestType {
    get = "get",
    post = "post",
    put = "put",
    patch = "patch",
    del = "delete",
}

function RouteHandler(methodName: RequestType) {
    return function (path: string) {
        return function (target: any, key: string, descriptor: RouteHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, methodName, target, key);
        }
    }
}


export const Get = RouteHandler(RequestType.get);
export const Post = RouteHandler(RequestType.post);
export const Put = RouteHandler(RequestType.put);
export const Patch = RouteHandler(RequestType.patch);
export const Delete = RouteHandler(RequestType.del);