import { API_PATH } from "../Paths";
import { USER_PREFIX } from "./UserPrefix";

class UserService {
  static async getProfile() {
    const response = await fetch(
      `${ API_PATH }/${ USER_PREFIX }/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  static async getUser(userUuid) {
    const response = await fetch(
      `${ API_PATH }/${ USER_PREFIX }/${ userUuid }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async updateUser(updatedUser, selectedFile) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedUser));
    formData.append("user_icon", selectedFile);

    const response = await fetch(
      `${ API_PATH }/${ USER_PREFIX }/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
        file: formData,
      }
    );
    return response.json();
  };
}

export default UserService;