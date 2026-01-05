const db = require("../config/db");



async function createUser  (username,password,role,name,email,phone,address) {
  const [result1] = await db.query(
    "INSERT INTO auth (username,password,role) VALUES (?, ?, ?)",
    [username, password,role]
  );
  const id = result1.insertId
  const [result2] = await db.query(
    "INSERT INTO user (name,email,phone,address,user_id) VALUES (?, ?, ?, ?, ?)",
    [name, email,phone,address,id]
  );
  return {
    id: result2.insertId,
    password,
    email,
  };
};
async function checkUser(username,email,phone){
  console.log(email)
  // const [result] = await db.query(
  //   "SELECT A.username,U.email,U.phone FROM auth as A INNER JOIN user U on A.id = U.user_id WHERE A.username = ? OR U.email = ? OR U.phone = ?",
  //   [username, email,phone]
  // );
  const [result] = await db.query(
    "SELECT * from user",
    [username, email,phone]
  );
  console.log(result)
  return result
}

module.exports ={createUser,checkUser}