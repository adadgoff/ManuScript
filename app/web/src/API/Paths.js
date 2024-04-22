// export const API_PATH = "http://localhost:8000/api";
import { IMAGE_PREFIX } from "./Image/ImagePrefix";
import { INVITE_PREFIX } from "./Invite/InvitePrefix";

export const API_PATH = "http://kaa77.keenetic.pro:8000/api";
export const WEB_PATH = "http://kaa77.keenetic.pro:3000";
export const IMAGE_PATH = `${ API_PATH }/${ IMAGE_PREFIX }`;

export const INVITE_PATH = `${ WEB_PATH }/${ INVITE_PREFIX }`;