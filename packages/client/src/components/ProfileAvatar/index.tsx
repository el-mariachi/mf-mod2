import { useState, FC } from 'react'
import { updateAvatar } from '@services/userController'
import Avatar from '@components/Avatar'
import UploadFile from '@components/UploadFile'
import './ProfileAvatar.scss'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { setUser } from '@store/slices/user'
import {
  AppError,
  clientSideErrorHandler,
  serverErrorHandler,
} from '@utils/errorsHandling'

type ProfileAvataProps = {
  avatar: string
}

const ProfileAvatar: FC<ProfileAvataProps> = ({ avatar }) => {
  const [modalOptions, setModalOptions] = useState({})
  const dispatch = useAppDispatch()

  const onAvatarClick = async () => {
    const promise = new Promise(res => {
      setModalOptions({ res })
    })

    const file = await promise
    setModalOptions({})

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file as Blob)

      try {
        const user: User = await updateAvatar(formData)
        dispatch(setUser(user))
      } catch (error) {
        clientSideErrorHandler(error as AppError, () =>
          alert('Что-то пошло не так...')
        )
        serverErrorHandler(error as AppError, () =>
          alert('Что-то пошло не так...')
        )
      }
    }
  }

  return (
    <div className="user-profile__avatar-wrapper" onClick={onAvatarClick}>
      <Avatar className="user-profile__avatar" image={avatar} />
      {Object.keys(modalOptions).length !== 0 ? (
        <UploadFile options={modalOptions} />
      ) : null}
    </div>
  )
}

export default ProfileAvatar
