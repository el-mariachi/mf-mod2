//import * as icons from 'react-bootstrap-icons'
import {
  IconProps as IconPropsNative,
  XSquareFill,
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
  InfoSquareFill,
} from 'react-bootstrap-icons'
import classNames from 'classnames'
import './Icon.scss'

const icons = {
  Dice3Fill,
  BarChartLineFill,
  ChatLeftTextFill,
  PersonSquare,
  XSquareFill,
  InfoSquareFill,
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
