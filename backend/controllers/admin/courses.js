import Courses from "../../models/courses.js";

export async function getCourses(req, res) {
  try {
    let course_code = req.params.course_code;
    console.log(course_code);
    if (course_code) {
      let courses = await Courses.find({ courseCode: course_code });
      res.json({
        status: "success",
        courses,
      });
    } else {
      let allCourses = await Courses.find({});
      res.json({
        status: "success",
        courses: allCourses,
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

export async function addNewCourse(req, res) {
  try {
    let courseinfo = req.body;
    console.log(courseinfo)
    console.log(courseinfo);
    let addNewCourse = new Courses({
      ...courseinfo,
    });
    await addNewCourse.save();
    res.send({
      status: "success",
      message: "courses registered successfully",
      addNewCourse,
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: "failed",
      message: "failed to save coourse credentials",
      eror: err.message,
    });
  }
}

export async function editCourses(req, res) {
  try {
    const updatedCourseInfo = req.body;
    console.log(updatedCourseInfo);
    if (!updatedCourseInfo) {
      return res.status(400).json({
        status: "failed",
        message: "Course code and updated course information are required",
      });
    }

    let course = await Courses.findOneAndUpdate(
      { _id: updatedCourseInfo?.id },
      { $set: updatedCourseInfo },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        status: "failed",
        message: "Course not found",
      });
    }

    res.json({
      status: "success",
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    console.log("error: " + err);
    res.json({
      status: "failed",
      message: "Something went wrong",
      error: err.message,
    });
  }
}

export async function deleteCourse(req, res) {
  try {
    const { courseid } = req.params;

    if (!courseid) {
      return res.status(400).json({
        status: "failed",
        message: "Course code is required to delete a course",
      });
    }

    const course = await Courses.findOneAndDelete({ _id: courseid });
    console.log(course);
    if (!course) {
      return res.status(404).json({
        status: "failed",
        message: "Course not found",
      });
    }

    res.json({
      status: "success",
      message: `Course with code ${course_code} has been deleted successfully`,
    });
  } catch (err) {
    console.log("error: " + err);
    res.json({
      status: "failed",
      message: "Something went wrong",
      error: err.message,
    });
  }
}
