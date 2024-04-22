import { API_PATH } from "../Paths";
import { INVITE_PREFIX } from "./InvitePrefix";

class InviteService {
  static async getInvite(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ INVITE_PREFIX }/${ classroomId }`, {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async joinClassroom(inviteUuid) {
    const response = await fetch(
      `${ API_PATH }/${ INVITE_PREFIX }/${ inviteUuid }`, {
        method: "POST",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async createInvite(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ INVITE_PREFIX }/${ classroomId }/create`, {
        method: "POST",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async updateInvite(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ INVITE_PREFIX }/${ classroomId }/update`, {
        method: "PUT",
        credentials: "include",
      }
    );
    return response.json();
  };

  static async deleteInvite(classroomId) {
    const response = await fetch(
      `${ API_PATH }/${ INVITE_PREFIX }/${ classroomId }/delete`, {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response.json();
  };
}

export default InviteService;