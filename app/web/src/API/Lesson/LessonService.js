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

  static async updateLesson(updatedLesson) {
    const response = await fetch(
      `${API_PATH}/${LESSON_PREFIX}/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLesson),
      }
    );
    return response.json();
  }

  static async deleteLesson(lessonId) {
    const response = await fetch(
      `${ API_PATH }/${ LESSON_PREFIX }/${ lessonId }/delete`, {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response.json();
  };
}

export default LessonService;