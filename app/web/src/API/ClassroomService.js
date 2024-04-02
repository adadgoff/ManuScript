import { API_PATH } from "../SETTINGS";

const PREFIX = "classroom/"

class ClassroomService {
  static async getStudentClassrooms() {
    const response = await fetch(`${ API_PATH }${ PREFIX }/my_student_classrooms`);
    return response.data;
  }

  static async getTeacherClassrooms() {
    const response = await fetch(`${ API_PATH }${ PREFIX }/my_teacher_classrooms`);
    return response.data;
  }

  static async getClassroomInfo(classroomId) {
    // return await fetch(`${ API_PATH }/classroom/${ classroomId }`);
    // const response = await fetch(`${ API_PATH }/classroom/${ 1 }`);
    // console.log(response.data);
  }
}

export default ClassroomService;