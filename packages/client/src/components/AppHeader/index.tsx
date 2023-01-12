import { FC, HTMLAttributes } from 'react'
import AppNav from '../AppNav'
import logoImg from '@images/skeleton.gif'
import './AppHeader.scss'

export type AppHeaderProps = HTMLAttributes<HTMLElement> & {
  showNav?: boolean
}
const AppHeader: FC<AppHeaderProps> = ({
  showNav,
  className: cls,
  ...attrs
}) => {
  return (
    <div className={('app-header ' + cls).trim()} {...attrs}>
      <div className="app-header__logo-image-box">
        <img className="app-header__logo-image" src={logoImg} />
      </div>

      <div className="app-header__app-name minecrafted minecrafted_bold">
        <div className="app-header__app-name-fstring">One Bit</div>
        <div className="app-header__app-name-sstring">Dungeon</div>
      </div>

      {showNav ? (
        <AppNav
          caption="One Bit Dungeon"
          paths={[
            {
              title: 'Играть!',
              path: '/',
            },
            {
              title: 'Список лидеров',
              path: '/leaderboard',
            },
            {
              title: 'Игровой форум',
              path: '/forum',
            },
            {
              title: 'Профиль игрока',
              path: '/profile',
            },
          ]}
        />
      ) : (
        ''
      )}
    </div>
  )
}
export default AppHeader
