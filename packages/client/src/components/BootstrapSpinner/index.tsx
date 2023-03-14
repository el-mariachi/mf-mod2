import { Spinner } from 'react-bootstrap'
import './BootstrapSpinner.css'

export default () => {
  return (
    <div className="spinner__wrapper">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
