//import { httpXML, httpFetch } from "../utils/http";

const API_URL = "https://ya-praktikum.tech/api/v2";

type ProfileData = Omit<User, "id" | "avatar">;

const updateProfile = async (data: ProfileData) => {
  ""
  //return httpXML.post(`${API_URL}/user/profile`);
}

const updateAvatar = async (data: any) => {
  ""
  //return httpXML.post(`${API_URL}/user/profile/avatar`);

}
const updatePassword = async (data: any) => {
  ""
  //return httpXML.post(`${API_URL}/user/password`);
}

export default {updateProfile, updateAvatar, updatePassword}
