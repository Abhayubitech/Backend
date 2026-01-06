const db = require("../config/db");

async function createUser(
  username,
  password,
  role,
  name,
  email,
  phone,
  address
) {
  const [result1] = await db.query(
    "INSERT INTO auth (username,password,role) VALUES (?, ?, ?)",
    [username, password, role]
  );
  const id = result1.insertId;
  const [result2] = await db.query(
    "INSERT INTO user (name,email,phone,address,user_id) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, address, id]
  );
  return {
    id: result2.insertId,
    password,
    email,
  };
}
async function checkUser(username, email, phone) {
  const [result] = await db.query(
    "SELECT A.username,U.email,U.phone FROM auth as A INNER JOIN user U on A.id = U.user_id WHERE A.username = ? OR U.email = ? OR U.phone = ?",
    [username, email, phone]
  );
  return result;
}
async function checkEmail(email) {
  const [result] = await db.query("SELECT * FROM user where email = ?", [
    email,
  ]);
  return result;
}
async function checkPhone(phone) {
  const [result] = await db.query("SELECT * FROM user where phone = ?", [
    phone,
  ]);
  console.log(result);
  return result;
}
async function checkUsername(username) {
  const [result] = await db.query("SELECT * FROM auth where username = ?", [
    username,
  ]);
  return result;
}
async function authUser(username, password) {
  const [result] = await db.query(
    "SELECT * FROM auth where username = ? AND password = ?",
    [username, password]
  );
  return result;
}
async function getUser(userId) {
  const [result] = await db.query(
    "SELECT * FROM user U ,auth A where U.user_id = A.id AND A.id = ?",
    [userId]
  );
  return result;
}
async function deleteuser(userId) {
  const [result1] = await db.query("DELETE FROM course WHERE user_id = ?", [
    userId,
  ]);
  const [result2] = await db.query("DELETE FROM user WHERE user_id = ?", [
    userId,
  ]);
  const [result3] = await db.query("DELETE FROM auth WHERE id = ?", [userId]);
  const totalAffRows =
    result1.affectedRows + result2.affectedRows + result3.affectedRows;
  return { totalAffRows };
}
async function updateUser(
  username,
  password,
  role,
  name,
  email,
  phone,
  address,
  user_id
) {
  const [result1] = await db.query(
    "UPDATE auth SET username = ?,password = ?,role = ? WHERE id = ?",
    [username, password, role, user_id]
  );

  const [result2] = await db.query(
    "UPDATE user SET name = ?,email = ?,phone = ?,address = ? WHERE user_id = ?",
    [name, email, phone, address, user_id]
  );
  const totalAffRows = result1.affectedRows + result2.affectedRows;
  return { totalAffRows };
}
async function getAllUserCourse(userId) {
  const [result] = await db.query(
    "SELECT * FROM course WHERE user_id = ?"
    [userId]
  );
  return result;
}
async function getAllUser() {
  const [result] = await db.query(
    "SELECT * FROM user U ,auth A where U.user_id = A.id"
  );
  return result;
}
module.exports = {
  createUser,
  checkUser,
  authUser,
  getUser,
  deleteuser,
  updateUser,
  checkEmail,
  checkPhone,
  checkUsername,
  getAllUserCourse,
  getAllUser
};
