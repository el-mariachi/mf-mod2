import userApi from '../api/userApi';

export async function updateProfile(data: any) {
  await userApi.updateProfile(data);
}

export async function updateAvatar(data: any) {
  await userApi.updateAvatar(data);
}

export async function updatePassword(data: any) {
  await userApi.updatePassword(data);
}
