import { CLASSROOM_PREFIX } from "../constants/classrooms";
import { API_PATH } from "../SETTINGS";

class ClassroomService {
  static async getStudentClassrooms() {
    const response = await fetch(`${ API_PATH }/${ CLASSROOM_PREFIX }/my_student_classrooms`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  }

  static async getTeacherClassrooms() {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/my_teacher_classrooms`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  }

  static async getClassroom(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ CLASSROOM_PREFIX }/${ classroomId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  }
}

export default ClassroomService;