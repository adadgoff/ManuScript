import { MODULE_PREFIX } from "../constants/modules";
import { API_PATH } from "../SETTINGS";

class ModuleService {
  // TODO: maybe delete.
  // static async getModule(moduleId) {
  //   const response = await fetch(
  //     `${ API_PATH }/${ MODULE_PREFIX }/${ moduleId }`, {
  //       method: "GET",
  //       credentials: "include",
  //     }
  //   );
  //   return response.json();
  // }

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