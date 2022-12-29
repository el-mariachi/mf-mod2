import React, { useState, createRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SpinnerButton from '../../components/SpinnerButton'
import { Link, useNavigate } from 'react-router-dom'
import { formUserErrorHandler } from '../../utils/errors_handling'
import { signInUser } from '../../services/authController'
import { getFormDataOf } from '../../utils'
import './style.css'

export type AuthPageProps = {
  signUpPageUrl?: string
}
export default function AuthPage(props: AuthPageProps) {
  const [mode, setMode] = useState('auth')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [validated, setValidated] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const authData = data as AuthData
  const isAuthMode = 'auth' == mode
  const refForm = createRef()

  let { signUpPageUrl } = props
  if (!signUpPageUrl) {
    signUpPageUrl = '/sign-up'
  }

  const toggleMode = () => {
    setMode(isAuthMode ? 'recover' : 'auth')
    setSubmitError('')
    setValidated(false)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = e.currentTarget.checkValidity()
    const data = getFormDataOf<SigninData>(refForm.current as HTMLFormElement)

    setData(data)
    setValidated(true)

    if (isValid) {
      setLoading(true)
      setReadOnly(true)

      if (isAuthMode) {
        signInUser(data)
          // TODO it`s temporary, use connected-react-router
          .then(() => navigate('/'))
          .catch(error => formUserErrorHandler(error, setSubmitError))
          .finally(() => {
            setLoading(false)
            setReadOnly(false)
            setValidated(false)
          })
      }
      // TODO it`s mock, need restore password api
      else
        new Promise(resolve => setTimeout(resolve, 2000)).finally(() => {
          setSubmitError('Функционал не готов :(')
          setLoading(false)
          setReadOnly(false)
          setValidated(false)
        })
    }
  }

  const AuthFormControl = ({
    label,
    name,
    type = 'text',
    value,
  }: {
    label: string
    name: string
    type?: string
    value?: string
  }) => {
    return (
      <Form.Group as={Row} className="mb-3" controlId={`authForm-${name}`}>
        <Form.Label column sm="3">
          {label}
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type={type}
            name={name}
            defaultValue={value}
            readOnly={readOnly}
            required
          />
          <Form.Control.Feedback type="invalid">
            Поле не должно быть пустым
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    )
  }
  const LoginControl = () => (
    <AuthFormControl label="Логин" name="login" value={authData?.login} />
  )
  const PasswordControl = () => (
    <AuthFormControl
      label="Пароль"
      name="password"
      type="password"
      value={authData?.password}
    />
  )
  const ButtonsBox = ({
    submitBtnTxt,
    toggleBtnTxt,
  }: {
    submitBtnTxt: string
    toggleBtnTxt: string
  }) => {
    return (
      <>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton loading={loading} className="mb-1 me-2">
              {submitBtnTxt}
            </SpinnerButton>
            <Button
              onClick={toggleMode}
              variant="outline-primary"
              className="mb-1">
              {toggleBtnTxt}
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <Link to={signUpPageUrl as string}>Регистрация</Link>
          </Col>
        </Form.Group>
      </>
    )
  }
  const AuthModeAuthForm = () => {
    return (
      <>
        <Row className="mb-4">
          <Col sm={{ span: 9, offset: 3 }}>
            <h1 className="h3">Авторизация</h1>
          </Col>
        </Row>
        {submitError ? <p className="text-danger mb-4">{submitError}</p> : ''}
        <LoginControl />
        <PasswordControl />
        <ButtonsBox submitBtnTxt="Войти" toggleBtnTxt="Не помню пароль" />
      </>
    )
  }
  const RecoverModeAuthForm = () => {
    return (
      <>
        <Row className="mb-2">
          <Col>
            <h1 className="h3">Восстановление пароля</h1>
          </Col>
        </Row>
        {submitError ? <p className="text-danger mb-4">{submitError}</p> : ''}
        <p className="text-muted fs-6 mb-4">
          {
            'На указанный при регистрации e-mail придет письмо с новым паролем для входа.'
          }
        </p>
        <LoginControl />
        <ButtonsBox
          submitBtnTxt="Восстановить"
          toggleBtnTxt="Вспомнил пароль"
        />
      </>
    )
  }
  return (
    <main className="tsFormBg w-100 h-100 d-flex position-fixed align-items-center justify-content-center">
      <Container className="tsFormBox mx-auto">
        <div className="bg-light rounded-4 p-5">
          <Form
            ref={refForm as React.RefObject<HTMLFormElement>}
            noValidate
            validated={validated}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            {isAuthMode ? <AuthModeAuthForm /> : <RecoverModeAuthForm />}
          </Form>
        </div>
      </Container>
    </main>
  )
}
