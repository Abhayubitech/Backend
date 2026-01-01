// let arr:(string|number)[] =['apple',3,'mango']

// let arr2:string[] = arr.filter((item)=>{
//     if(typeof item ==='string'){
//         return true
//     }
//     return false
// }) as string[]

// console.log(arr2)

// type Person = {
//     name:string
// }

// type Person2 = {
//     address:string
// }
// // merging two object types using intersection
// let obj:Person & Person2={
//     name:'john',
//      address:'gwl'
// }

// optional keys in object

// interface Person{
// name:string,
// add?:{
//     city:string
// },

// phone:number,
// homePhone?:number
// }

// let obj1 :Person={
//     name: "",

//     phone: 0,
// }

// console.log(obj1.add?.city)

// let lookUp: {
//   [key: string]: number;
// } = {
//   a: 1,
//   d: 2,
//   e: 4,
//   f: 5,
// };
// function countPoints(str:string):number{
//      let count = 0;
//      str = str.toLowerCase();
//      str.split('').forEach((char)=>{
//         count += lookUp[char]??0
//      })

//      return count 
// }
// console.log(countPoints('ABHAYASDFKJD'));
