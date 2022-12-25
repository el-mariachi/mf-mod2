import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './sign_up.scss'

const SignUp = () => {
  return (
    <div className="sign_up w-100 h-100 d-flex position-fixed align-items-center justify-content-center">
      <Container fluid className="sign_up bg-secondary d-flex">
        <Container className="sm">
          <Row className="justify-content-sm-center">
            <Col sm="auto">
              <Form>Превед</Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}

export { SignUp }
