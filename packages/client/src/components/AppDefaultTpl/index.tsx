import { FC, HTMLAttributes } from 'react'
import { Container } from 'react-bootstrap'
import AppHeader from '../AppHeader'
import './AppDefaultTpl.scss'

export type AppDefaultTplProps = HTMLAttributes<HTMLElement> & {
  showNav?: boolean
  withPaddings?: boolean
  centered?: boolean
}
const AppDefaultTpl: FC<AppDefaultTplProps> = ({
  showNav,
  centered = false,
  withPaddings = true,
  children: content,
  className: cls,
  ...attrs
}) => {
  return (
    <main
      className={(
        'w-100 h-100 d-flex position-fixed' +
        (centered
          ? ' align-items-center justify-content-center'
          : ' pt-4 overflow-auto') +
        ' app-def-tpl ' +
        cls
      ).trim()}
      {...attrs}>
      <Container className="mx-auto app-def-tpl__wrapper">
        <AppHeader showNav={showNav} className="mb-2 mx-auto" />
        <div className={'bg-light' + (withPaddings ? ' p-5' : '')}>
          {content}
        </div>
      </Container>
    </main>
  )
}
// align-items-center justify-content-center
export default AppDefaultTpl
