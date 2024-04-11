import { API_PATH } from "../Paths";

class AuthService {
  static async login(email, password) {
    const response = await fetch(`${ API_PATH }/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });
    return response.json();
  }

  static async register(email, username, password) {
    const response = await fetch(`${ API_PATH }/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      })
    });
    return response.json();
  }
}

export default AuthService;