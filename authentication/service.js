const fs = require("fs");
const db = require('./db')

async function addUser(userData) {
    const connection = await db()
  const { email, password } = userData;
  let res = {
    msg: "",
    status: false,
  };
  if (!checkEmail(email)) {
    res.msg = "Email is Required";
    res.status = false;
    return res
  }
  if (!checkPassword(password)) {
    res.msg = "Password is Required";
    res.status = false;
    res.status = false;
    return res
  }
 const [rows,fields] = await connection.query(`Select email from user where email = '${email}'`)
 console.log(rows)
if(rows.length){
    return {
        msg:'user already exist',
        status:false
    }
}
 const response = await connection.query(`INSERT INTO user (email,password) VALUES ('${email}', '${password}');`);
  

 return {
    msg :"success",
    status:true
 }
   
 
  
  
}
function authenticateUser(userData) {
  const { email, password } = userData;
  let res = {
    msg: "",
    status: false,
  };
  if (!checkEmail(email)) {
    res.msg = "Email is Required";
    res.status = false;

    return res
  }
  if (!checkPassword(password)) {
    res.msg = "Password is Required";
    res.status = false;
    return res
  }
  const isExist = fs.existsSync("data.json");

  if (isExist) {
    const jsonData = fs.readFileSync("data.json", "utf-8");
    const data = JSON.parse(jsonData);
     const user = data.find((item)=>item.email == email)
     if(user && user.password == password){
      res.msg='login successfully'
      res.status = true
     }else{

      res.msg = "Invalid User";
      res.status = false;
     }
      
  
  } else {
    res.msg = "Invalid User";
    res.status = false;
   
  }
  return res;
}

function checkEmail(email) {
  if (email == undefined || email == null || email == "") {
    return false;
  }
  return true;
}
function checkDupEmail(email, data) {
  const index = data.findIndex((item) => item.email == email);
  return index > -1;
}
function checkPassword(password) {
  if (password == undefined || password == null || password == "") {
    return false;
  }
  return true;
}
module.exports = {addUser,authenticateUser}