import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SpinnerButton from '@components/SpinnerButton'
import FormControl from '@components/FormControl'
import AppDefaultTpl from '@components/AppDefaultTpl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInInputData, defaultValues, AuthFormStruct } from './constants'
import { Link } from 'react-router-dom'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { signInUser } from '@services/authController'
import './SignIn.scss'
import { LoggedInCheck, nonAuthorizedPageAccessOpts } from 'hoc/LoggedInCheck'
import ROUTES from '@constants/routes'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser } from '@store/slices/user'
import OauthBox from '@components/OauthBox'
import { signInWithYandex } from '@services/oauthController'
export type SignInProps = {
  signUpPageUrl?: ROUTES
}

const SignIn = (props: SignInProps) => {
  const [mode, setMode] = useState('auth')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [validated, setValidated] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dispatch = useAppDispatch()
  const isAuthMode = 'auth' === mode

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })

  let { signUpPageUrl } = props
  if (!signUpPageUrl) {
    signUpPageUrl = ROUTES.SIGN_UP
  }

  const toggleMode = () => {
    setMode(isAuthMode ? 'recover' : 'auth')
    setSubmitError('')
    setValidated(false)
  }

  const formSubmit: SubmitHandler<AuthFormStruct> = data => {
    setValidated(true)
    setLoading(true)
    setReadOnly(true)

    if (isAuthMode) {
      signInUser(data)
        .then(() => {
          dispatch(loadUser())
        })
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

  const formControls = signInInputData.map((controlProps, index) => (
    <FormControl
      key={index}
      formName="authForm"
      register={register}
      errors={errors}
      readOnly={readOnly}
      controlProps={controlProps}
    />
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
    <AppDefaultTpl showNav={false} centered={true} className="sign-in">
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
            ) : null}
            {formControls}
            <ButtonsBox submitBtnTxt="Войти" toggleBtnTxt="Не помню пароль" />
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
            ) : null}
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
      <OauthBox />
    </AppDefaultTpl>
  )
}

export default LoggedInCheck(nonAuthorizedPageAccessOpts)(SignIn)
