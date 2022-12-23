import { IServicePageProps } from './ServicePageProps'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function ServicePage({ errorCode, errorText }: IServicePageProps) {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <section className="service-page page d-flex justify-content-center vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>{errorCode}</h1>
        <p>{errorText}</p>
        <Button variant="primary" onClick={() => goBack()}>
          Вернуться назад
        </Button>
      </div>
    </section>
  )
}
export default ServicePage
