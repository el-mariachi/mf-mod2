import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from '@components/FormControl'
import AppDefaultTpl from '@components/AppDefaultTpl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { inputData, defaultValues, SignUpFormStruct } from './constants'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpUser } from '@services/authController'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import SpinnerButton from '@components/SpinnerButton'

const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpFormStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const [submitError, setSubmitError] = useState('')

  const formSubmit: SubmitHandler<SignUpFormStruct> = data => {
    // compare passwords
    if (data.confirmPassword !== data.password) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Пароли не совпадают',
      })
      return
    }
    clearErrors()

    setLoading(true)
    setReadOnly(true)

    signUpUser(data)
      // TODO it`s temporary, use connected-react-router
      .then(() => navigate('/'))
      .catch((error: AppError) => formUserErrorHandler(error, setSubmitError))
      .finally(() => {
        setLoading(false)
        setReadOnly(false)
      })
  }

  const formControls = inputData.map((controlProps, index) => (
    <FormControl
      key={index}
      formName="signUpForm"
      register={register}
      errors={errors}
      readOnly={readOnly}
      controlProps={controlProps}
    />
  ))

  return (
    <AppDefaultTpl showNav={false} centered={true} className="sign-up">
      <Form onSubmit={handleSubmit(formSubmit)}>
        <Row className="mb-4">
          <Col sm={{ span: 9, offset: 3 }}>
            <h1 className="h3">Регистрация</h1>
          </Col>
        </Row>

        {submitError ? <p className="text-danger mb-3">{submitError}</p> : null}

        {formControls}

        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton loading={loading}>
              Создать аккаунт 
            </SpinnerButton>
            <Link to="/sign-in">
              <Button as="span" variant="link">
                Войти
              </Button>
            </Link>
          </Col>
        </Form.Group>
      </Form>
    </AppDefaultTpl>
  )
}

export default SignUp
