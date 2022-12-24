import Avatar from '../../components/Avatar';
import './index.css';

type AvatarType = string;

type profileAvataProps = {
  avatar: AvatarType | undefined;
};
const yaResources = 'https://ya-praktikum.tech/api/v2/resources';

export default ({ avatar }: profileAvataProps) => {
  const image = avatar ? `${yaResources}${avatar}` : "'/src/assets/king.png'";

  const onAvatarClick = async () => {};

  return (
    <div className="user-profile__avatar-wrapper" onClick={onAvatarClick}>
      <Avatar className="user-profile__avatar" image={image} />
    </div>
  );
};
