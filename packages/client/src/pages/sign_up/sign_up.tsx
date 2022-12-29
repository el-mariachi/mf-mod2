import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useForm } from 'react-hook-form'
import { inputData, defaultValues } from './constants'
import { MouseEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpUser } from '../../services/authController'
import { formUserErrorHandler } from '../../utils/errors_handling'
import './sign_up.scss'

const SignUp = () => {
  type FormData = typeof defaultValues

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const [submitError, setSubmitError] = useState('')

  const formSubmit = (data: FormData) => {
    // compare passwords
    if (data.confirmPassword !== data.password) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Пароли не совпадают',
      })
      return
    }
    clearErrors()

    signUpUser(data)
      // TODO it`s temporary, use connected-react-router
      .then(() => navigate('/'))
      .catch(error => formUserErrorHandler(error, setSubmitError))
  }
  const navigate = useNavigate()

  return (
    <div className="sign_up w-100 h-100 d-flex position-fixed align-items-center justify-content-center">
      <Container className="sign_up-form mx-auto">
        <div className="bg-light rounded-4 p-5">
          <Form onSubmit={handleSubmit(formSubmit)}>
            <Row className="mb-4">
              <Col sm={{ span: 9, offset: 3 }}>
                <h1 className="h3">Регистрация</h1>
              </Col>
            </Row>

            {submitError ? (
              <p className="text-danger mb-3">{submitError}</p>
            ) : (
              ''
            )}

            {inputData.map((input, index) => (
              <Form.Group
                as={Row}
                className="mb-3"
                controlId={`signUp-${index}`}>
                <Form.Label column sm="3">
                  {input.label}:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type={input.type}
                    isInvalid={errors[input.name] !== undefined}
                    {...register(input.name, {
                      required: 'Поле должно быть заполнено',
                      pattern: {
                        value: input.test,
                        message: input.message,
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {String(errors[input.name]?.message)}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            ))}

            <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button type="submit">Создать аккаунт</Button>
                <Link to="/sign-in">
                  <Button as="span" variant="link">
                    Войти
                  </Button>
                </Link>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export { SignUp }
