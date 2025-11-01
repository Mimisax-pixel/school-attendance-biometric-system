import Courses from "../../models/courses.js";

export async function getCourses(req, res) {
  try {
    let lecturerId = req.user.id
    if (lecturerId) {
      let course_code = req.params.course_code;
      console.log(course_code);
      if (course_code) {
        let courses = await Courses.find({
          courseCode: course_code,
          lecturerId,
        });
        res.json({
          status: "success",
          courses,
        });
      } else {
        let allCourses = await Courses.find({lecturerId});
        res.json({
          status: "success",
          courses: allCourses,
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
