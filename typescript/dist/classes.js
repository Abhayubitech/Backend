"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    constructor() {
        console.log('constructor run');
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
let obj = new Person();
