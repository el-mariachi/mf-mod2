import { IServicePageProps } from './ServicePageProps'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './ServicePage.scss'

function ServicePage({ errorCode, errorText }: IServicePageProps) {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <main className="d-flex justify-content-center vh-100 service-page">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 minecrafted">{errorCode}</h1>
        <p>{errorText}</p>
        <Button variant="primary" onClick={() => goBack()}>
          Вернуться назад
        </Button>
      </div>
    </main>
  )
}
export default ServicePage
