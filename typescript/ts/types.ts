let a:number = 5;
let b:string = 'hello';
let c:boolean = true;
let d:any = 5;
let e:unknown = 'dd';
let f:undefined = undefined;
let g:null = null;



let arr:string[] = ['apple','mango']

let obj:{
    name:string,
    age:number,
    add:string,
    veteran:boolean
}  = {
    name:'john',
    age:21,
    add:'gwl',
    veteran:false
}


function main ():string{
return 'ss'
}

// uninion types

let val: number | string;

val = Math.random() > 0.5 ? 3 : "hello";

if (typeof val === "string") {
  val
}


// type aliases


type Person = {
    name:string,
    add:string
}


let obj2:Person = {
    add:'sdfa',
    name:'asdf'
}


// interface


interface Person2  {
    name:string,
    add:string
}

let obj3:Person2 = {
    add:'sdfa',
    name:'asdf'
}

//type assertion
let asser:unknown =  3;
let asser2 = asser as string


//literal types

let lit:'cat'|'dog' = 'dog';



