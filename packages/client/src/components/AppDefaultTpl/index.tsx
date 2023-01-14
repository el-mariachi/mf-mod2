import { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import AppHeader from '@components/AppHeader'
import classNames from 'classnames'
import './AppDefaultTpl.scss'

export type AppDefaultTplProps = HTMLAttributes<HTMLElement> & {
  showNav?: boolean
  withPaddings?: boolean
  centered?: boolean
}
const AppDefaultTpl: FC<AppDefaultTplProps> = ({
  showNav = true,
  centered = false,
  withPaddings = true,
  children: content,
  className: cls,
  ...attrs
}) => {
  return (
    <div
      className={classNames(
        'w-100 h-100 d-flex position-fixed',
        centered
          ? 'align-items-center justify-content-center'
          : 'pt-4 overflow-auto',
        'app-def-tpl',
        cls
      )}
      {...attrs}>
      <Container className="mx-auto app-def-tpl__wrapper">
        <AppHeader showNav={showNav} className="mb-2 mx-auto" />
        <main className={classNames('bg-light', { 'p-5': withPaddings })}>
          {content}
        </main>
      </Container>
    </div>
  )
}
export default AppDefaultTpl
