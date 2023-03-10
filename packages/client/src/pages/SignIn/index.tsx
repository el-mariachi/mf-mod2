import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import AppDefaultTpl from '@components/AppDefaultTpl'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import OauthBox from '@components/OauthBox'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInInputData, defaultValues, AuthFormStruct } from './constants'
import { Link } from 'react-router-dom'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { signInUser } from '@services/authController'
import { LoggedInCheck, nonAuthorizedPageAccessOpts } from 'hoc/LoggedInCheck'
import ROUTES from '@constants/routes'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser } from '@store/slices/user'
import './SignIn.scss'

export type SignInProps = {
  signUpPageUrl?: ROUTES
}
const SignIn = (props: SignInProps) => {
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [validated, setValidated] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dispatch = useAppDispatch()

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

  const formSubmit: SubmitHandler<AuthFormStruct> = data => {
    setValidated(true)
    setLoading(true)
    setReadOnly(true)

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
  return (
    <AppDefaultTpl showNav={false} centered={true} className="sign-in">
      <Form validated={validated} onSubmit={handleSubmit(formSubmit)}>
        <Row className="mb-4">
          <Col sm={{ span: 9, offset: 3 }}>
            <h1 className="h3">Авторизация</h1>
          </Col>
        </Row>
        {submitError ? <p className="text-danger mb-4">{submitError}</p> : null}
        {formControls}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton loading={loading} className="mb-1 me-2">
              Войти с логином
            </SpinnerButton>
            <OauthBox note="или с помощью" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <Link to={signUpPageUrl as string}>Регистрация</Link>
          </Col>
        </Form.Group>
      </Form>
    </AppDefaultTpl>
  )
}
export default LoggedInCheck(nonAuthorizedPageAccessOpts)(SignIn)
