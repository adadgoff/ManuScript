import { API_PATH } from "../Paths";
import { STEP_PREFIX } from "./StepPrefix";

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