import React, { useState, createRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SpinnerButton from '../../components/SpinnerButton'
import { getFormDataObject } from './helper'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'

type AuthData = {
  login?: string
  password?: string
}
export type AuthPageProps = {
  signUpPageUrl?: string
}
export default function AuthPage(props: AuthPageProps) {
  const [mode, setMode] = useState('auth')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [validated, setValidated] = useState(false)
  const [data, setData] = useState({})
  const isAuthMode = 'auth' == mode
  const refForm = createRef()

  let { signUpPageUrl } = props
  if (!signUpPageUrl) {
    signUpPageUrl = '/sign_up'
  }

  const toggleMode = () => {
    setMode(isAuthMode ? 'recover' : 'auth')
    setValidated(false)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = e.currentTarget.checkValidity()
    const formData = getFormDataObject(refForm.current as HTMLFormElement)

    setData(formData)
    setValidated(true)

    if (isValid) {
      setLoading(true)
      setReadOnly(true)

      // TODO it`s mock, need api: TS-68
      new Promise(resolve => setTimeout(resolve, 3000)).finally(() => {
        setLoading(false)
        setReadOnly(false)
      })
    }
  }

  const authData = data as AuthData
  const AuthFormControl = ({
    name,
    type = 'text',
    value,
  }: {
    name: string
    type?: string
    value?: string
  }) => {
    return (
      <Form.Group as={Row} className="mb-3" controlId="authFormLogin">
        <Form.Label column sm="3">
          Логин:
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
  // const LoginField = () =>
  // {
  //   return <Form.Group as={Row} className="mb-3" controlId="authFormLogin">
  //     <Form.Label column sm="3">
  //       Логин:
  //     </Form.Label>
  //     <Col sm={9}>
  //       <Form.Control type="text" name="login" defaultValue={authData?.login} readOnly required />
  //       <Form.Control.Feedback type="invalid">
  //         Поле не должно быть пустым
  //       </Form.Control.Feedback>
  //     </Col>
  //   </Form.Group>
  // }
  // const PasswordField = () =>
  // {
  //   return <Form.Group as={Row} className="mb-3" controlId="authFormPassword">
  //     <Form.Label column sm="3">
  //       Пароль:
  //     </Form.Label>
  //     <Col sm={9}>
  //       <Form.Control type="password" name="password" defaultValue={authData?.password} readOnly required />
  //       <Form.Control.Feedback type="invalid">
  //         Поле не должно быть пустым
  //       </Form.Control.Feedback>
  //     </Col>
  //   </Form.Group>
  // }
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
            <SpinnerButton loading={loading} className="mb-1">
              {submitBtnTxt}
            </SpinnerButton>{' '}
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
            <Button href={signUpPageUrl} variant="link">
              Регистрация
            </Button>
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
        <AuthFormControl name="login" value={authData?.login} />
        <AuthFormControl name="password" value={authData?.password} />
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
        <p className="text-muted fs-6 mb-4">
          {
            'На указанный при регистрации e-mail придет письмо с новым паролем для входа.'
          }
        </p>
        <AuthFormControl name="login" value={authData?.login} />
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
