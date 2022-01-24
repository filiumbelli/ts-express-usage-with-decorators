import { Router } from "express";
import "reflect-metadata";
@Controller
class ExampleController {


    @Get("/examplePath")
    exampleGet(): void {

    }
}

const router = Router();
function Controller(target: typeof ExampleController) {
    for (let key in target.prototype) {
        const path = Reflect.getMetadata("path", target.prototype, key);
        const middleWare = Reflect.getMetadata("middleware", target.prototype, key);
        // router.get(path, target.prototype[key]);
    }

    // for each method it will get the path
    // and create a router for each path
    // console.log(target)
}

function Get(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("path", path, target, key)
    }
    // creates a metadata that will contains
    // a metadata of the path

}