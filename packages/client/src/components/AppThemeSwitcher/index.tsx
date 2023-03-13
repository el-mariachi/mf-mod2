import { capitalize } from '@utils/index'
import classNames from 'classnames'
import { AppThemeContext } from 'context'
import { FC, HTMLAttributes } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './AppThemeSwitcher.scss'

type AppThemeSwitcherProps = HTMLAttributes<HTMLDivElement>
const AppThemeSwitcher: FC<AppThemeSwitcherProps> = ({
  className: cls,
  ...attrs
}) => {
  return (
    <AppThemeContext.Consumer>
      {({ active: theme, switch: switchTheme, list: themesList }) => {
        return (
          <div className={classNames('app-theme-switcher', cls)} {...attrs}>
            <DropdownButton
              title={`Тема: ${theme}`}
              variant="outline-light"
              align="end">
              {themesList.map(appTheme => (
                <Dropdown.Item
                  key={appTheme}
                  as="button"
                  onClick={() => switchTheme(appTheme)}
                  active={theme == appTheme}>
                  {capitalize(appTheme)}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        )
      }}
    </AppThemeContext.Consumer>
  )
}
export default AppThemeSwitcher
