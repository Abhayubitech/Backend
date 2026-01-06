const courseService = require("../services/course.service");

async function createCourse(req, res) {
  const { title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  user_id } = req.body;
console.log(req.body)
if (
  !(
    title &&
    description &&
    subject &&
    start_date &&
    end_date &&
    from_time &&
    to_time &&
    user_id
  )
) {
  return res.status(400).json({
    status: false,
    msg: "All fields are mandatory",
    data: {
      title,
      description,
      subject,
      start_date,
      end_date,
      from_time,
      to_time,
      user_id
    },
  });
}
  try {
    
 
      const response = await courseService.createCourse(
        title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  user_id
      );
      console.log(response);
      res.json({
        status: true,
        msg: "course added successfully",
        data: response,
      });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const result = await courseService.getCourse(courseId);
    if (result.length) {
      res
        .status(200)
        .json({ status: true, msg: "course fetch successfully", data: result });
    } else {
      res.status(404).json({ status: false, msg: "course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    const result = await courseService.deleteCourse(courseId);
    console.log(result);
    if (result.totalAffRows) {
      res
        .status(200)
        .json({ status: true, msg: "course deleted successfully", data: result });
    } else {
      res.status(404).json({ status: false, msg: "deletion failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function updateCourse(req, res) {
  const {
   title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  courseId
  } = req.body;

  try {
    const response = await courseService.updateCourse(
       title,
  description,
  subject,
  start_date,
  end_date,
  from_time,
  to_time,
  courseId
    );
    console.log(response);
    res.json({
      status: true,
      msg: "User updated successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getAllCourse(req, res) {
  try {
    // const courseId = req.params.id;
    const result = await courseService.getAllCourse();
    if (result.length) {
      res
        .status(200)
        .json({ status: true, msg: "courses fetch successfully", data: result });
    } else {
      res.status(404).json({ status: false, msg: "courses not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
 createCourse,
 deleteCourse,
 updateCourse,
 getCourse,
 getAllCourse
};
