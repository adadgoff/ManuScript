import { API_PATH } from "../Paths";
import { CLASSROOM_PREFIX } from "./ClassroomPrefix";

class ClassroomService {
  static async getStudentClassrooms() {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/my_student_classrooms`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async getTeacherClassrooms() {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/my_teacher_classrooms`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async getClassroom(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/${ classroomId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async getClassroomEdit(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/${ classroomId }/edit`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async createClassroom(title, description) {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      }
    );
    return response.json();
  };

  static async updateClassroom(updatedClassroom, selectedFile) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedClassroom));
    formData.append("classroom_icon", selectedFile);

    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
        file: formData,
      }
    );
    return response.json();
  };

  static async deleteClassroom(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/${ classroomId }/delete`, {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response.json();
  };
}

export default ClassroomService;