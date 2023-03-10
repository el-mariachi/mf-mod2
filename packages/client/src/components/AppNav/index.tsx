import classNames from 'classnames'
import { FC } from 'react'
import { Nav, Navbar, NavbarProps, Offcanvas } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { logout } from '@services/authController'
import Icon, { IconName } from '@components/Icon'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { clearUser } from '@store/slices/user'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@constants/routes'
import { AppContainerContext } from 'context'
import './AppNav.scss'

type AppNavPath = {
  title: string
  icon?: IconName
  path?: string
  callback?: () => void
  extLink?: string
}
export type AppNavProps = NavbarProps & {
  paths: AppNavPath[]
  caption?: string
}
const AppNav: FC<AppNavProps> = ({ paths, caption, className: cls }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const navItems = paths.map(({ title, icon, path, callback, extLink }) => {
    return (
      <li key={title} className="nav-item">
        {path ? (
          <NavLink
            className={({ isActive }) =>
              classNames('nav-link d-flex align-items-center', {
                active: isActive,
              })
            }
            to={path}
            end>
            {icon ? <Icon iconName={icon} className="me-2" /> : null}
            <span>{title}</span>
          </NavLink>
        ) : (
          <Nav.Link
            onClick={(e: React.SyntheticEvent) => {
              if (callback) {
                e.preventDefault()
                callback()
              }
            }}
            className="nav-link d-flex align-items-center"
            href={extLink || '#'}>
            {title}
          </Nav.Link>
        )}
      </li>
    )
  })
  return (
    <AppContainerContext.Consumer>
      {container => (
        <Navbar className={classNames('app-nav', cls)} expand={false}>
          <Navbar.Toggle
            className="app-nav__toggler"
            aria-controls="offcanvasNavbar"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            container={container}
            aria-labelledby="offcanvasNavbarLabel"
            placement="end">
            <Offcanvas.Header className="app-nav__header px-4" closeButton>
              {caption ? (
                <Offcanvas.Title
                  className="offcanvas-title minecrafted minecrafted_bold"
                  id="offcanvasNavbarLabel">
                  {caption}
                </Offcanvas.Title>
              ) : null}
            </Offcanvas.Header>
            <Offcanvas.Body className="p-4">
              <Nav className="justify-content-end flex-grow-1 pe-3" as="ul">
                {navItems}
                <li key="exit" className="nav-item">
                  <Nav.Link
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault()
                      logout().then(() => {
                        dispatch(clearUser())
                        navigate(ROUTES.SIGN_IN)
                      })
                    }}
                    className="nav-link d-flex align-items-center"
                    href="#">
                    <Icon iconName="XSquareFill" className="me-2" />
                    <span>Выход</span>
                  </Nav.Link>
                </li>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      )}
    </AppContainerContext.Consumer>
  )
}
export default AppNav
