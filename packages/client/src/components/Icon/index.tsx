import * as icons from 'react-bootstrap-icons'
import classNames from 'classnames'
import './Icon.scss'

export type IconName = keyof typeof icons
interface IconProps extends icons.IconProps {
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
