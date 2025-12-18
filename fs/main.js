const fs = require('fs');
const data ={
    name : 'HHH',
    email:'HHH@gmail.com'
}
// updateUser(3,data)
// deleteUser(2)
// addUser(data)
function addUser(userData){
  const isExist = fs.existsSync('data.json')

   if(isExist){
    const jsonData = fs.readFileSync('data.json','utf-8')
    const data = JSON.parse(jsonData)
    userData.id = data.length+1;
    data.push(userData)
    fs.writeFileSync('data.json',JSON.stringify(data))
   
   }else{
    userData.id = 1
     fs.writeFileSync('data.json',JSON.stringify([userData]))
   }
 console.log('User Added Succesfully')
}
function readALLUser(){ 
fs.readFile('data.json','utf-8',(err,data)=>{
    if(err){
        console.log('No such file exist')
    }
    console.log(JSON.parse(data))
})
}

function updateUser(id,userData){
const isExist = fs.existsSync('data.json')
if(isExist){
     const jsonData = fs.readFileSync('data.json','utf-8')
    const data = JSON.parse(jsonData)
   const index =  data.findIndex((item)=>item.id == id)
   if(index>-1){
     data[index] = {...userData,id:data[index].id}
        fs.writeFileSync('data.json',JSON.stringify(data))
        console.log('user upadated successfully')
   }else{
    console.log('user not found')
   }
}
else{
    console.log('file does not exist')
}
}

function deleteUser(id){
const isExist = fs.existsSync('data.json')
if(isExist){
     const jsonData = fs.readFileSync('data.json','utf-8')
    const data = JSON.parse(jsonData)
   const index =  data.findIndex((item)=>item.id == id)
   if(index>-1){
     data.splice(index,1)
        fs.writeFileSync('data.json',JSON.stringify(data))
        console.log('user deleted successfully')
   }else{
    console.log('user not found')
   }
}
else{
    console.log('file does not exist')
}
}