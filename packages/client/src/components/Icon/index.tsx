//import * as icons from 'react-bootstrap-icons'
import {
  IconProps as IconPropsNative,
  XSquareFill,
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
} from 'react-bootstrap-icons'
import classNames from 'classnames'
import './Icon.scss'
import logo from '@images/Y_log_30_bordo_transp.svg'

const icons = {
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
  XSquareFill,
}

export type IconName = keyof typeof icons
interface IconProps extends IconPropsNative {
  iconName: IconName
}
const Icon = ({ iconName, className: cls, ...props }: IconProps) => {
  const BootstrapIcon = icons[iconName]
  return (
    <div className={classNames('icon', cls)}>
      <BootstrapIcon className="icon__img" {...props} />
    </div>
  )
}
export default Icon

export const OauthIcons = {
  Yandex: () => <img width="32px" src={logo} />,
}
