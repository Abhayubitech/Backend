const db = require("../config/db");

async function createCourse(
  title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  user_id
) {
  const [result] = await db.query(
    `INSERT INTO course ( title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  user_id) VALUES (?, ?, ?,?,?,?,?,?)`,
    [  title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  user_id]
  );

  return {
    id: result.insertId,
  };
}


async function getCourse(courseId) {
  const [result] = await db.query(
    "SELECT * FROM course WHERE id = ?"
    [courseId]
  );
  return result;
}
async function getAllCourse() {
  const [result] = await db.query(
    "SELECT * FROM course"
  );
  return result;
}

async function deleteCourse(courseId) {
  const [result1] = await db.query("DELETE FROM course WHERE id = ?", [
    courseId,
  ]);
  const totalAffRows =
    result1.affectedRows 
  return { totalAffRows };
}
async function updateCourse(
  title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  courseId
) {
  const [result1] = await db.query(
    `UPDATE course SET title = ?,description = ?,subject = ? ,start_date = ? ,end_date = ? ,from_time = ?,to_time = ? WHERE id = ?`,
    [ title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,courseId]
  );

 
  const totalAffRows = result1.affectedRows
  return { totalAffRows };
}

module.exports = {
  createCourse,
  getCourse,
  getAllCourse,
  deleteCourse,
  updateCourse,
  
};
