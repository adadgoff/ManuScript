import { STEP_PREFIX } from "../constants/steps";
import { API_PATH } from "../SETTINGS";

class StepService {
  static async getStep(stepId) {
    const response = await fetch(
      `${ API_PATH }/${ STEP_PREFIX }/${ stepId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  }
}

export default StepService;