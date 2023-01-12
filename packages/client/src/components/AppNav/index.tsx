import { FC } from 'react'
import { Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/authController'
import './AppNav.scss'

type AppNavPath = {
  title: string
  path?: string
  callback?: () => void
  extLink?: string
}
export type AppNavProps = {
  paths: AppNavPath[]
  caption?: string
}
const AppNav: FC<AppNavProps> = ({ paths, caption }) => {
  const navigate = useNavigate()
  const navItems = paths.map(({ title, path, callback, extLink }) => {
    return (
      <li key={title} className="nav-item">
        {path ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to={path}
            end>
            {title}
          </NavLink>
        ) : (
          <Nav.Link
            onClick={(e: React.SyntheticEvent) => {
              if (callback) {
                e.preventDefault()
                callback()
              }
            }}
            className="nav-link"
            href={extLink || '#'}>
            {title}
          </Nav.Link>
        )}
      </li>
    )
  })
  return (
    <Navbar className="app-nav" expand={false}>
      <Navbar.Toggle
        className="app-nav__toggler"
        aria-controls="offcanvasNavbar"
      />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="end">
        <Offcanvas.Header className="app-nav__header" closeButton>
          {caption ? (
            <Offcanvas.Title
              className="offcanvas-title minecrafted minecrafted_bold"
              id="offcanvasNavbarLabel">
              {caption}
            </Offcanvas.Title>
          ) : (
            ''
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3" as="ul">
            {navItems}
            <Nav.Link
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault()

                logout().then(() => {
                  if (!['/sign-in', '/sign-up'].includes(location.pathname)) {
                    navigate('/sign-in')
                  }
                })
              }}
              className="nav-link"
              href="#">
              Выход
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  )
}
export default AppNav
