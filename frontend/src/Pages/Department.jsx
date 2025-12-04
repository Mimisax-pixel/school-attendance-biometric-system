import React, { useState } from "react";
import { useDepartment } from "../hooks/useDepartment";
import Navbar from "../Components/Layouts/Navbar";
import SearchBar from "../Components/SearchBar";
import EditDeptModal from "../Components/EditDeptModal";
import AddDeptModal from "../Components/AddDeptModal";
import { Edit2, Trash2 } from "lucide-react";
import { useDeleteDepartment } from "../hooks/useDeleteDepartment";
import toast from "react-hot-toast";

const Department = () => {
  const { departments, isLoading, isError, error } = useDepartment();
  const { deleteDepartment } = useDeleteDepartment();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // if (isLoading) return <p className="p-6">Loading courses...</p>;

  const filteredDepartment = (departments || []).filter(
    (department) =>
      (department.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (department.school || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Navbar Title={"Department Management"} />
      <main className="flex-grow w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-8 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <p className="font-medium text-gray-600 text-sm sm:text-base md:text-lg">
            Manage Departments and their details. {filteredDepartment.length}{" "}
            course(s) found.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-white bg-[#1173D4] py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-[#0E5EAC] transition"
          >
            + Add New Department
          </button>
        </div>

        <div className="w-full mb-6">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredDepartment.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No courses found.{" "}
            {searchTerm && `Try adjusting your search term "${searchTerm}".`}
          </div>
        ) : (
          <section className="w-full">
            <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <div className="min-w-full grid grid-cols-5 text-left px-4 md:px-6 gap-4 font-semibold text-gray-500 text-xs sm:text-sm border-b border-gray-200 py-3">
                  <div>S/N</div>
                  <div>TITLE</div>
                  <div>SCHOOL</div>
                  <div>--</div>
                  <div>ACTIONS</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {isError && "Error fetching courses"}
                  {isLoading && "Loading..."}
                  {(isLoading == false || isError == false) && (
                    <>
                      {filteredDepartment.map((department, index) => (
                        <div
                          key={department._id}
                          className="min-w-full grid grid-cols-5 items-center px-4 md:px-6 py-4 gap-4 text-gray-700 text-sm hover:bg-gray-50 transition"
                        >
                          <div className="truncate">{index}</div>
                          <div className="truncate">{department.title}</div>
                          <div className="truncate">{department.school}</div>
                          <div className="truncate">--</div>
                          <div className="flex gap-3">
                            <button
                              className="p-1"
                              onClick={() => setSelectedCourse(department)}
                              aria-label={`edit ${department.title}`}
                            >
                              <Edit2 className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                            </button>

                            <button
                              className="p-1"
                              onClick={async () => {
                                console.log(department._id);

                                const confirmDelete = window.confirm(
                                  `Are you sure you want to delete ${department.title}?`
                                );
                                if (confirmDelete) {
                                  deleteDepartment(department._id).then(() => {
                                    toast.success(
                                      "Department deleted successfully"
                                    );
                                  });
                                  // `${course.courseTitle} deleted successfully`
                                }
                              }}
                            >
                              <Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile list */}
            <div className="block sm:hidden mt-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 divide-y divide-gray-200">
                {filteredDepartment.map((department, index) => (
                  <div key={department._id} className="p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-800 truncate">
                          {department.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 truncate">
                        {department.school}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end mt-1">
                      <button
                        className="p-1"
                        onClick={() => setSelectedCourse(department)}
                        aria-label={`edit ${department.title}`}
                      >
                        <Edit2 className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                      </button>

                      <button
                        className="p-1"
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            `Are you sure you want to delete ${department.title}?`
                          );
                          if (confirmDelete) {
                            deleteDepartment(department._id).then(() => {
                              toast.success("Department deleted successfully");
                            });
                          }
                        }}
                      >
                        <Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <EditDeptModal
        department={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

      {showAddModal && <AddDeptModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Department;
