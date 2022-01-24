import "reflect-metadata";

@getDecorators
@setUrl("test", "Test")
class DecoratorTest {

    constructor(private test: string) { }

    @setDecorators("test")
    testFunction() {
        console.log("Testing")
    }
}
function setUrl(param: string, value: string) {
    return function (target: any) {
        target.prototype[param] = value;
        console.log(target.prototype)
    }
}
function setDecorators(meta: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata("meta", meta, target, key);
    }
}

function getDecorators(target: Function) {
    for (let key in target.prototype) {
        const meta = Reflect.getMetadata("meta", target.prototype, key);
        // target.prototype[key]()
    }

}
