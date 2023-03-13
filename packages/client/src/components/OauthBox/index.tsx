import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'
import Icon from '@components/Icon'
import oauth from '@services/oauthController'
import './OauthBox.scss'

export type OauthBoxProps = HTMLAttributes<HTMLDivElement> & {
  note: string
}
const OauthBox: FC<OauthBoxProps> = ({
  note = 'Войти с помощью',
  className: cls,
  ...attrs
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const oauthServiceName = e.currentTarget.getAttribute(
      'data-oservice'
    ) as string
    oauth(oauthServiceName)
  }
  return (
    <div
      className={classNames('d-inline-flex align-items-center oauth-box', cls)}
      {...attrs}>
      <div className="w-auto fs-6">{note}</div>
      <Button
        onClick={handleClick}
        data-oservice="yandex"
        variant="link"
        className="w-auto"
        title="Яндекс ID">
        <Icon iconName="OauthYandexIcon" />
      </Button>
    </div>
  )
}
export default OauthBox
