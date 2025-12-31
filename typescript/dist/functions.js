"use strict";
//Generic function
Object.defineProperty(exports, "__esModule", { value: true });
// function add<Type>(a:Type,b:Type):Type | undefined{
//    return a
// }
// console.log( add<number>(4,5))
// console.log(add<string>('john','wick'))
// optional params
function printName(firstName, middleName, lastName) {
    console.log(firstName + middleName + lastName);
}
printName('narendra', 'damodardas');
