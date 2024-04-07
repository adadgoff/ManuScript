import { API_PATH } from "../../constants/API/APIConstants";
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
  }
}

export default LessonService;