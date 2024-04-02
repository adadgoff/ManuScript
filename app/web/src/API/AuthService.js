import { API_PATH } from "../SETTINGS";

class AuthService {
  static async login(email, password) {
    return await fetch(`${API_PATH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });
  }

  static async register(email, username, password) {
    return await fetch(`${API_PATH}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      })
    });
  }
}

export default AuthService;