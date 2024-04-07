import { API_PATH } from "../../constants/API/APIConstants";
import { STEP_PREFIX } from "./StepConstants";

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