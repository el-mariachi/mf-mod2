import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { OauthIcons } from '@components/Icon'
import oauth from '@services/oauthController'
import './OauthBox.css'


const OauthBox = () => {
  const handleClick = (e: React.MouseEvent) => {
    const oauthServiceName = e.currentTarget.getAttribute('data-oservice') as string;
    oauth(oauthServiceName)
  }

  return (
    <>
      <Row className="mt-4 align-items-center oauth-box">
        <div className="w-auto fs-6">Войти с помощью: </div>
        <Button
          onClick={handleClick}
          data-oservice="yandex"
          variant="link"
          className="w-auto"
          title="яндекс id">
          <OauthIcons.Yandex />
        </Button>
      </Row>
    </>
  )
}

export default OauthBox
