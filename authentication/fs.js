const fs = require("fs");

function addUser(userData) {
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
  const isExist = fs.existsSync("data.json");

  if (isExist) {
    const jsonData = fs.readFileSync("data.json", "utf-8");
    const data = JSON.parse(jsonData);
    if (checkDupEmail(email, data)) {
      res.msg = "Duplicate email";
      res.status = false;
    } else {
      data.push(userData);
      fs.writeFileSync("data.json", JSON.stringify(data));
      res.msg = "User Added Succesfully";
      res.status = true;
    }
  } else {
    res.msg = "User Added Succesfully";
    res.status = true;
    fs.writeFileSync("data.json", JSON.stringify([userData]));
  }
  return res;
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