import Courses from "../../models/courses.js";

export async function getCourses(req, res) {
  try {
    let lecturerId = req.user.id
    if (lecturerId) {
      let course_code = req.params.course_code;
      if (course_code) {
        let courses = await Courses.find({
          courseCode: course_code,
          lecturerId,
        });
        console.log(courses);
        
        res.json({
          status: "success",
          courses,
        });
      } else {
        let courses = await Courses.find({ lecturerId });
        console.log(courses);
        res.json({
          status: "success",
          courses
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "bad request",
      });
    }
  } catch (err) {
    console.log("error: " + err);
    res.json({
      status: "failed",
      message: "Something went wrong",
      error: err.message,
    });
  }
}
