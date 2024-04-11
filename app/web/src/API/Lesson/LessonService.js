import { API_PATH } from "../Paths";
import { LESSON_PREFIX } from "./LessonConstants";

class LessonService {
  static async getLesson(lessonId) {
    const response = await fetch(
      `${ API_PATH }/${ LESSON_PREFIX }/${ lessonId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async getLessonEdit(lessonId) {
    const response = await fetch(
      `${ API_PATH }/${ LESSON_PREFIX }/${ lessonId }/edit`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async deleteLesson(lessonId) {
    const response = await fetch(
      `${ API_PATH }/${ LESSON_PREFIX }/$`
    )
    return response.json();
  };
}

export default LessonService;