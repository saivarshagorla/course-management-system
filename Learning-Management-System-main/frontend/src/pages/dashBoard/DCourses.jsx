import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faBookOpen,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { adminService } from "../../api/admin.service";
import CourseModal from "./CourseModal";
import DeleteModal from "./DeleteModal";
import AddQuestion from "./AddQuestions";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [courseModal, setCourseModal] = useState({
    isOpen: false,
    mode: "add",
    courseId: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    course: null,
  });

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await adminService.getAllCourses();

      if (result.success && result.data.length > 0) {
        setCourses(result.data);
      } else {
        // 👉 fallback demo data (names only)
        setCourses([
          { course_id: 1, course_name: "C Programming" },
          { course_id: 2, course_name: "Data Structures" },
          { course_id: 3, course_name: "React JS" },
          { course_id: 4, course_name: "Database Systems" },
        ]);
      }
    } catch {
      message.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const openAddCourseModal = () =>
    setCourseModal({ isOpen: true, mode: "add", courseId: null });

  const openEditCourseModal = (course) =>
    setCourseModal({
      isOpen: true,
      mode: "edit",
      courseId: course.course_id,
    });

  const closeCourseModal = () =>
    setCourseModal({ isOpen: false, mode: "add", courseId: null });

  const handleCourseSuccess = () => fetchCourses();

  const openDeleteModal = (course) =>
    setDeleteModal({ isOpen: true, course });

  const closeDeleteModal = () =>
    setDeleteModal({ isOpen: false, course: null });

  const handleDeleteCourse = async (course) =>
    await adminService.deleteCourse(course.course_id);

  const handleDeleteSuccess = () => fetchCourses();

  const addQuestions = (course_id) => setSelectedCourseId(course_id);

  return (
    <div className="max-w-7xl mx-auto">

      {selectedCourseId ? (
        <AddQuestion
          courseId={selectedCourseId}
          onBack={() => setSelectedCourseId(null)}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="px-10 py-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Course Management
                </h1>
                <p className="text-blue-100">
                  Manage courses, tests and students
                </p>
              </div>

              <button
                onClick={openAddCourseModal}
                className="bg-white text-blue-700 rounded-xl px-6 py-3 font-semibold flex items-center gap-2 shadow hover:scale-105 transition"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Course
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center py-20">
                <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <p className="mt-4 text-gray-600">
                  Loading courses...
                </p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-5xl text-gray-300 mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  No Courses Yet
                </h3>
              </div>
            ) : (
              <div className="grid gap-6">

                {courses.map((course) => (
                  <div
                    key={course.course_id}
                    className="group relative bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >

                    {/* Accent bar */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600"></div>

                    <div className="p-6 flex items-center justify-between">

                      {/* Course name */}
                      <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition">
                        {course.course_name}
                      </h3>

                      {/* Buttons */}
                      <div className="flex gap-2">

                        <button
                          onClick={() => addQuestions(course.course_id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:scale-105 transition"
                        >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </button>

                        <button
                          onClick={() => openEditCourseModal(course)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(course)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        </div>
      )}

      {/* MODALS */}
      <CourseModal
        isOpen={courseModal.isOpen}
        onClose={closeCourseModal}
        onSuccess={handleCourseSuccess}
        courseId={courseModal.courseId}
        mode={courseModal.mode}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onSuccess={handleDeleteSuccess}
        onDelete={handleDeleteCourse}
        item={deleteModal.course}
        itemType="Course"
        title="Delete Course"
        description="Are you sure you want to delete this course?"
        itemDisplayName={deleteModal.course?.course_name}
      />
    </div>
  );
}

export default Courses;