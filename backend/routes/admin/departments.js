import express from "express";
import {
  addNewDepartment,
  getDepartment,
  editDepartment,
  deleteDepartment,
} from "../../controllers/admin/department.js";
import isRole from "../../middleware/verifyrole.js";
import isAuthenticated from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/department", isAuthenticated, isRole(["lecturer","adimin"]), getDepartment);
router.get(
  "/department/:course_code",
  isAuthenticated,
  isRole("admin"),
  getDepartment
);
router.post(
  "/department",
  isAuthenticated,
  isRole("admin"),
  addNewDepartment
);

router.patch(
  "/department/:id",
  isAuthenticated,
  isRole("admin"),
  editDepartment
);

router.delete(
  "/department/:id",
  isAuthenticated,
  isRole("admin"),
  deleteDepartment
);

export default router;
