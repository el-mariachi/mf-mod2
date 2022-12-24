type PasswordModalProps = {
  modalContent: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const passwordData = [
  {
    name: 'oldPassword',
    type: 'password',
    value: '',
    label: 'Старый пароль',
  },
  {
    name: 'newPassword',
    type: 'password',
    value: '',
    label: 'Новый пароль',
  },
  {
    name: 'newPassword2',
    type: 'password',
    value: '',
    label: 'Повторите новый пароль',
  },
];
