type UserDTO = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

type ProfileInputProps = {
  type: string, 
  name: string,
  placeholder?: string,
  value: string,
  label: string
}
