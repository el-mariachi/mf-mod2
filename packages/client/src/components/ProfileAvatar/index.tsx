import { useState } from 'react';
import { updateAvatar } from '../../services/userController';
import Avatar from '../../components/Avatar';
import UploadFile from '../../components/UploadFile';
import './index.css';

type AvatarType = string;

type profileAvataProps = {
  avatar: AvatarType | undefined;
};
const yaResources = 'https://ya-praktikum.tech/api/v2/resources';

export default ({ avatar }: profileAvataProps) => {
  //ToDo убрать(изменить) после того, как будет сделана api
  const initialImage = avatar ? `${yaResources}${avatar}` : "'/src/assets/king.png'";
  const [image, setImage] = useState(initialImage);
  // end ToDo

  const [modalOptions, setModalOptions] = useState({});

  const onAvatarClick = async () => {
    const promise = new Promise(res => {
      setModalOptions({ res });
    });

    const file = await promise;
    setModalOptions({});

    if (file) {
      //ToDo убрать(изменить) после того как будет api () = ormData.append('avatar', file as Blob);
      const formData = new FormData();
      formData.append('resource', file as Blob);
      const xhr = await updateAvatar(formData);
      const response = (xhr as XMLHttpRequest).response;
      setImage(`${yaResources}/${response.path}`);
    }
  };

  return (
    <div className="user-profile__avatar-wrapper" onClick={onAvatarClick}>
      <Avatar className="user-profile__avatar" image={image} />
      {Object.keys(modalOptions).length !== 0 ? <UploadFile options={modalOptions} /> : null}
    </div>
  );
};
