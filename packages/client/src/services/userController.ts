import userApi from '../api/userApi';

export async function updateProfile(data: any) {
  await userApi.updateProfile(data);
}

export async function updateAvatar(data: FormData) {
  // ToDo заменить когда будет готово апи
  const yaResources = 'https://ya-praktikum.tech/api/v2/resources';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', yaResources);

    xhr.onload = () => {
      if (xhr.status >= 300) {
        reject(xhr);
      } else {
        resolve(xhr);
      }
    };
    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.send(data);
  });
}

export async function updatePassword(data: any) {
  await userApi.updatePassword(data);
}
