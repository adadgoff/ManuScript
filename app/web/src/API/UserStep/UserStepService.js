import { API_PATH } from "../Paths";
import { USER_STEP_PREFIX } from "./UserStepPrefix";

class UserStepService {
  static async getMyAnswer(stepId) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/${ stepId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async getUserStep(stepId, userUuid) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/${ stepId }/${ userUuid }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async toCorrectUserStep(stepId, userUuid) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/${ stepId }/${ userUuid }/to_correct`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async toIncorrectUserStep(stepId, userUuid) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/${ stepId }/${ userUuid }/to_incorrect`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async postAnswer(stepId, userAnswer, answerImg) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      step_id: stepId,
      user_answer: userAnswer,
    }));
    formData.append("answer_img", answerImg, answerImg.name);

    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/answer`, {
        method: "POST",
        credentials: "include",
        body: formData,
        file: formData,
      }
    );

    return response.json();
  };

  static async addTeacherComment(stepId, userUuid, teacherComment) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/teacher/add_comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step_id: stepId,
          user_uuid: userUuid,
          teacher_comment: teacherComment,
        }),
      }
    );
    return response.json();
  };
}

export default UserStepService;