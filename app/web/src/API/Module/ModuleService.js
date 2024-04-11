import { API_PATH } from "../Paths";
import { MODULE_PREFIX } from "./ModulePrefix";

class ModuleService {
  static async getBaseModule(moduleId) {
    const response = await fetch(
      `${ API_PATH }/${ MODULE_PREFIX }/${ moduleId }/base`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  }
}

export default ModuleService;