import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import dummyAvatarImg from '@images/king.png'
import './ForumAvatar.scss'
import { getFile } from '@api/resourceApi'

export type ForumAvatarProps = HTMLAttributes<HTMLDivElement> & {
  image?: string
  alt?: string
  title?: string
  size?: 'small' | 'regular' | 'large' | 'auto'
}
const ForumAvatar: FC<ForumAvatarProps> = ({
  image,
  alt = 'Аватар',
  title = 'Аватар',
  size = 'regular',
  className: cls,
  ...attrs
}) => {
  const avatar_img = image ? getFile(image) : dummyAvatarImg
  return (
    <div
      className={classNames(cls, 'forum-avatar', {
        [`forum-avatar_size_${size}`]: 'auto' != size,
      })}
      {...attrs}>
      <img
        className={classNames(
          'rounded-circle d-inline-block border',
          { 'border-2 p-1': 'small' != size },
          'forum-avatar__image'
        )}
        alt={alt}
        title={title}
        src={avatar_img}
      />
    </div>
  )
}
export default ForumAvatar
