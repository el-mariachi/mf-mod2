import { FC, HTMLAttributes } from 'react'
import AppNav from '@components/AppNav'
import classNames from 'classnames'
import AppThemeSwitcher from '@components/AppThemeSwitcher'
import logoImg from '@images/skeleton.gif'
import './AppHeader.scss'

export type AppHeaderProps = HTMLAttributes<HTMLElement> & {
  showNav?: boolean
}
const AppHeader: FC<AppHeaderProps> = ({
  showNav = true,
  className: cls,
  ...attrs
}) => {
  return (
    <header className={classNames('app-header', cls)} {...attrs}>
      <div className="app-header__logo-area">
        <div className="app-header__logo-image-box">
          <img className="app-header__logo-image" src={logoImg} />
        </div>

        <div className="app-header__app-name minecrafted minecrafted_bold">
          <div className="app-header__app-name-fstring">One Bit</div>
          <div className="app-header__app-name-sstring">Dungeon</div>
        </div>
      </div>

      <div className="app-header__nav-area">
        <AppThemeSwitcher className="app-header__theme-switcher" />
        {showNav ? (
          <AppNav
            className="app-header__nav ms-3"
            caption="One Bit Dungeon"
            paths={[
              {
                title: 'Об игре',
                path: '/',
                icon: 'InfoSquareFill',
              },
              {
                title: 'Играть!',
                path: '/game',
                icon: 'Dice3Fill',
              },
              {
                title: 'Список лидеров',
                path: '/leaderboard',
                icon: 'BarChartLineFill',
              },
              {
                title: 'Игровой форум',
                path: '/forum',
                icon: 'ChatLeftTextFill',
              },
              {
                title: 'Профиль игрока',
                path: '/profile',
                icon: 'PersonSquare',
              },
            ]}
          />
        ) : null}
      </div>
    </header>
  )
}
export default AppHeader
