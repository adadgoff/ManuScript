import { API_PATH } from "../Paths";
import { USER_STEP_PREFIX } from "./UserStepPrefix";

class UserStepService {
  static async getUserStep(stepId) {
    const response = await fetch(
      `${ API_PATH }/${ USER_STEP_PREFIX }/${ stepId }`, {
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
}

export default UserStepService;