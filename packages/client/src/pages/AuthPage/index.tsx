import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SpinnerButton from '../../components/SpinnerButton'
import { useForm } from 'react-hook-form'
import { signInInputData, defaultValues } from './constants'
import { Link, useNavigate } from 'react-router-dom'
import { AppError, formUserErrorHandler } from '../../utils/errors_handling'
import { signInUser } from '../../services/authController'
import './style.css'

export type AuthPageProps = {
  signUpPageUrl?: string
}
type SignInFormData = typeof defaultValues

export default function AuthPage(props: AuthPageProps) {
  const [mode, setMode] = useState('auth')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [validated, setValidated] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()
  const isAuthMode = 'auth' == mode

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })

  let { signUpPageUrl } = props
  if (!signUpPageUrl) {
    signUpPageUrl = '/sign-up'
  }

  const toggleMode = () => {
    setMode(isAuthMode ? 'recover' : 'auth')
    setSubmitError('')
    setValidated(false)
  }

  const formSubmit = (data: SignInFormData) => {
    setValidated(true)
    setLoading(true)
    setReadOnly(true)

    if (isAuthMode) {
      signInUser(data)
        // TODO it`s temporary, use connected-react-router
        .then(() => navigate('/'))
        .catch((error: AppError) => formUserErrorHandler(error, setSubmitError))
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

  const formControls = signInInputData.map(controlProps => (
    <Form.Group
      as={Row}
      className="mb-3"
      controlId={`authForm-${controlProps.name}`}>
      <Form.Label column sm="3">
        {controlProps.label}
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          type={controlProps.type}
          isInvalid={errors[controlProps.name] !== undefined}
          {...register(controlProps.name, {
            required: 'Поле должно быть заполнено',
            pattern: {
              value: controlProps.test,
              message: controlProps.message,
            },
          })}
          readOnly={readOnly}
        />
        <Form.Control.Feedback type="invalid">
          {String(errors[controlProps.name]?.message)}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  ))

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

  return (
    <main className="tsFormBg w-100 h-100 d-flex position-fixed align-items-center justify-content-center">
      <Container className="tsFormBox mx-auto">
        <div className="bg-light rounded-4 p-5">
          <Form validated={validated} onSubmit={handleSubmit(formSubmit)}>
            {isAuthMode ? (
              <>
                <Row className="mb-4">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <h1 className="h3">Авторизация</h1>
                  </Col>
                </Row>
                {submitError ? (
                  <p className="text-danger mb-4">{submitError}</p>
                ) : (
                  ''
                )}
                {formControls}
                <ButtonsBox
                  submitBtnTxt="Войти"
                  toggleBtnTxt="Не помню пароль"
                />
              </>
            ) : (
              <>
                <Row className="mb-2">
                  <Col>
                    <h1 className="h3">Восстановление пароля</h1>
                  </Col>
                </Row>
                {submitError ? (
                  <p className="text-danger mb-4">{submitError}</p>
                ) : (
                  ''
                )}
                <p className="text-muted fs-6 mb-4">
                  {
                    'На указанный при регистрации e-mail придет письмо с новым паролем для входа.'
                  }
                </p>
                {formControls[0]}
                <ButtonsBox
                  submitBtnTxt="Восстановить"
                  toggleBtnTxt="Вспомнил пароль"
                />
              </>
            )}
          </Form>
        </div>
      </Container>
    </main>
  )
}
