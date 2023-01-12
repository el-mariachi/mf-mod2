import { useState } from 'react'
import { updateAvatar } from '../../services/userController'
import { getFile } from '../../api/resourceApi'
import Avatar from '../../components/Avatar'
import UploadFile from '../../components/UploadFile'
import './ProfileAvatar.scss'

type AvatarType = string

type profileAvataProps = {
  avatar: AvatarType | undefined
}

export default ({ avatar }: profileAvataProps) => {
  const initialImage = avatar ? avatar : "'@images/king.png'"

  const [image, setImage] = useState(initialImage)
  const [modalOptions, setModalOptions] = useState({})

  const onAvatarClick = async () => {
    const promise = new Promise(res => {
      setModalOptions({ res })
    })

    const file = await promise
    setModalOptions({})

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file as Blob)

      const user: UserDTO = await updateAvatar(formData)
      if (user) {
        setImage(getFile(user.avatar))
      }
    }
  }

  return (
    <div className="user-profile__avatar-wrapper" onClick={onAvatarClick}>
      <Avatar className="user-profile__avatar" image={image} />
      {Object.keys(modalOptions).length !== 0 ? (
        <UploadFile options={modalOptions} />
      ) : null}
    </div>
  )
}
