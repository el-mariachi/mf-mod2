import {DEFAULT_USER} from "./constants";

export const getUserProfileData = (user: UserDTO = DEFAULT_USER): ProfileInputProps[] => {
  const profileData = [
    {
      name: 'email',
      type: 'email',
      value: user.email,
      label: 'email',
    },
    {
      name: 'login',
      type: 'text',
      value: user.login,
      label: 'Логин',
    },
    {
      name: 'firstName',
      type: 'text',
      value: user.firstName,
      label: 'Имя',
    },
    {
      name: 'secondName',
      type: 'text',
      value: user.secondName,
      label: 'Фамилия',
    },
    {
      name: 'displayName',
      type: 'text',
      value: user.displayName,
      label: 'Имя в игре',
    },
    {
      name: 'phone',
      type: 'tel',
      value: user.phone,
      label: 'Телефон',
    },
    {
      name: 'password',
      type: 'password',
      value: '',
      placeholder: '••••••••••••',
      label: 'Пароль',
    },
  ];
  return profileData;
};
