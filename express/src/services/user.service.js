const db = require("../config/db");

exports.getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return {data:rows,msg:'success'};
};

exports.createUser = async ({ password, email }) => {
  const [result] = await db.query(
    "INSERT INTO user (password, email) VALUES (?, ?)",
    [password, email]
  );

  return {
    id: result.insertId,
    password,
    email,
  };
};
