import React, { useState } from "react";
import LecturesSearchbar from "./LecturesSearchbar";
import LecturerNav from "./LecturerNav";
import LecturerModal from "./LecturerModal";
import { useLecturers } from "../hooks/useLecturers";
import { useDeleteLecturer } from "../hooks/useDeleteLecturer";
import { useAddLecturer } from "../hooks/useAddLecturer";
import toast from "react-hot-toast";

const LecturerAttendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: lecturers,
    isLoading,
    isError,
    error,
  } = useLecturers(searchQuery);
  const deleteLecturerMutation = useDeleteLecturer();
  const { addLecturer, isLoading: isAdding } = useAddLecturer();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lecturer?"))
      return;
    try {
      await deleteLecturerMutation.mutateAsync(id);
      toast.success("Lecturer deleted successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete lecturer");
    }
  };

  const handleAddLecturer = (formData) => {
    addLecturer(formData, {
      onSuccess: () => {
        setShowModal(false);
      },
    });
  };

  // if (isLoading) return <p className="p-6">Loading lecturers...</p>;
  if (isError) return <p className="p-6 text-red-600">{error?.message}</p>;

  return (
    <div className="container  bg-gray-200/50 mx-auto py-10 px-4 sm:px-6 lg:px-20">
      <LecturerNav onAddClick={() => setShowModal(true)} />
      <LecturesSearchbar onSearch={(q) => setSearchQuery(q)} />

      {showModal && (
        <LecturerModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddLecturer}
        />
      )}

      {/* Desktop Table Header */}
      <div className="hidden md:grid px-5 pt-3 box-content rounded-lg bg-white grid-cols-[1.3fr_1.2fr_1.2fr_1.8fr_2fr_0.6fr] gap-6 pb-3 border-b border-gray-200 text-gray-500 font-bold text-sm lg:text-base ">
        <p className="text-left">NAME</p>
        <p className="text-left">DEPARTMENT</p>
        {/* <p className="text-left">FACULTY</p> */}
        <p className="text-left">CONTACT</p>
        {/* <p className="text-left">COURSES</p> */}
        <p className="text-right">ACTIONS</p>
      </div>
      {isLoading && (<p className="p-6 text-center">Loading lecturers...</p>)}
      
      {/* Table Rows */}
      {(isLoading == false && isError == false) && (
        <div className=" space-y-4 bg-white rounded-b-2xl">
          {lecturers.map((lect) => (
            <div
              key={lect._id}
              className="grid grid-cols-1 md:grid-cols-[1.3fr_1.2fr_1.2fr_1.8fr_2fr_0.6fr] gap-y-3 md:gap-x-6 bg-white md:bg-transparent border md:border-0 shadow-sm md:shadow-none rounded-lg  p-4 md:p-5 items-start md:items-center hover:bg-gray-50 transition-all  box-content"
            >
              <p className="font-medium text-[#32333B] text-sm md:text-base PL-3">
                {lect.name || lect.fullName}
              </p>
              <p className="font-medium text-[#32333B] text-sm md:text-base pl-6">
                {lect.department}
              </p>
              {/* <p className="font-medium text-[#32333B] text-sm md:text-base"> */
            /* {lect.faculty || "-"} */}
              {/* </p> */}
              <p className="font-medium text-[#32333B] text-sm md:text-base break-words pl-10">
                {lect.contact || lect.email || "-"}
              </p>
              {/* <p className="font-medium text-[#32333B] text-sm md:text-base whitespace-normal leading-relaxed break-words max-w-[250px] md:max-w-full">
              {lect.courses_assigned && lect.courses_assigned.join
                ? lect.courses_assigned.join(", ")
                : lect.courses || "N/A"}
            </p> */}

              <div className="flex justify-start md:justify-end gap-2">
                <button className="text-blue-600 font-semibold hover:underline text-sm md:text-base">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lect._id)}
                  className="text-red-600 font-semibold hover:underline text-sm md:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
    )}
    </div>
  );
};

export default LecturerAttendance;
