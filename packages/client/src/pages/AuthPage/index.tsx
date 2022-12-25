import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SpinnerButton from '../../components/SpinnerButton'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'

export default function AuthPage() {
  const [mode, setMode] = useState('auth')
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const isAuthMode = 'auth' == mode

  const toggleMode = () => setMode(isAuthMode ? 'recover' : 'auth')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO it`s mock, need validation: TS-64
    const isValid = true
    if (isValid) {
      setLoading(true)

      // TODO it`s mock, need api: TS-68
      new Promise(resolve => setTimeout(resolve, 3000)).finally(() => {
        setLoading(false)
        setValidated(true)
      })
    }
  }
  return (
    <div className="tsFormBg w-100 h-100 d-flex position-fixed align-items-center justify-content-center">
      <Container className="tsFormBox mx-auto">
        <div className="bg-light rounded-4 p-5">
          <Form
            noValidate
            validated={validated}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            {isAuthMode ? (
              <Row className="mb-4">
                <Col sm={{ span: 9, offset: 3 }}>
                  <h1 className="h3">Авторизация</h1>
                </Col>
              </Row>
            ) : (
              <Row className="mb-2">
                <Col>
                  <h1 className="h3">Восстановление пароля</h1>
                </Col>
              </Row>
            )}
            {!isAuthMode ? (
              <p className="text-muted fs-6 mb-4">
                {
                  'На указанный при регистрации e-mail придет письмо с новым паролем для входа.'
                }
              </p>
            ) : (
              ''
            )}
            <Form.Group as={Row} className="mb-3" controlId="authFormPassword">
              <Form.Label column sm="3">
                Логин:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" name="login" required />
                <Form.Control.Feedback type="invalid">
                  Поле не должно быть пустым
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {isAuthMode ? (
              <>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="passwordFormPassword">
                  <Form.Label column sm="3">
                    Пароль:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="password" name="password" required />
                    <Form.Control.Feedback type="invalid">
                      Поле не должно быть пустым
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ span: 9, offset: 3 }}>
                    <SpinnerButton loading={loading}>Войти</SpinnerButton>
                    <Button onClick={toggleMode} variant="link">
                      не помню пароль
                    </Button>
                  </Col>
                </Form.Group>
              </>
            ) : (
              <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                  <SpinnerButton loading={loading}>Восстановить</SpinnerButton>
                  <Button onClick={toggleMode} variant="link">
                    вспомнил пароль
                  </Button>
                </Col>
              </Form.Group>
            )}
          </Form>
        </div>
      </Container>
    </div>
  )
}
