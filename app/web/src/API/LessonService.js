import { LESSON_PREFIX } from "../constants/lessons";
import { API_PATH } from "../SETTINGS";

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