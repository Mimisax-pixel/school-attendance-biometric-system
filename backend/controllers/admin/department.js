import Department from "../../models/department.js";

export async function getDepartment(req, res) {
  try {
    let department = req.params.department;
    // console.log(course_code);
    if (department) {
      let department = await Department.find({ title: department });
      res.json({
        status: "success",
        courses,
      });
    } else {
      let allDepartment = await Department.find({});
      res.json({
        status: "success",
        courses: allDepartment,
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

export async function addNewDepartment(req, res) {
  try {
    let departmentInfo = req.body;
    let id = req.user.id;
    // console.log(DepartmentInfo);
    // console.log(courseinfo);
    let addNewDepartment = new Department({
      ...departmentInfo,
      lecturerId: id,
    });
    await addNewDepartment.save();
    res.send({
      status: "success",
      message: "courses registered successfully",
      addNewDepartment,
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



export async function editDepartment(req, res) {
  try {
      const updatedDepartmentInfo = req.body;
      let id = req.params.id
    //   console.log(id);
      
    //   console.log(updatedDepartmentInfo);
      
    if (!updatedDepartmentInfo) {
      return res.status(400).json({
        status: "failed",
        message: "Course code and updated course information are required",
      });
    }

    let department = await Department.findOneAndUpdate(
      { _id: id },
      { $set: updatedDepartmentInfo },
      { new: true }
      );
      console.log(department);
      

    if (!department) {
      return res.status(404).json({
        status: "failed",
        message: "Course not found",
      });
    }

    res.json({
      status: "success",
      message: "Course updated successfully",
      department,
    });
  } catch (err) {
    
    res.json({
      status: "failed",
      message: "Something went wrong",
      error: err.message,
    });
  }
}

export async function deleteDepartment(req, res) {
  try {
    const departmentid = req.params.id;
    console.log(departmentid)
    if (!departmentid) {
      return res.status(400).json({
        status: "failed",
        message: "Department id is required to delete a course",
      });
    }

    const department = await Department.findOneAndDelete({ _id: departmentid });
    // console.log(course);
    if (!course) {
      return res.status(404).json({
        status: "failed",
        message: "Department not found",
      });
    }

    res.json({
      status: "success",
      message: `department has been deleted successfully`,
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
