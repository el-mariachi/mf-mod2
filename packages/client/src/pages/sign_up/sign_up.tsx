import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useForm } from 'react-hook-form'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './sign_up.scss'
import { inputData, defaultValues } from './constants'
import { MouseEvent, useState } from 'react'
// TODO uncomment next line in router context
//import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  type FormData = typeof defaultValues

  const {
    register,
    handleSubmit,
    formState: { errors },
    // TODO decide if we need to reset form at any point
    // reset,
  } = useForm<FormData>({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues,
  })

  const [customErrors, setCustomErrors] = useState(errors)

  const formSubmit = (data: FormData) => {
    // compare passwords
    if (data.password2 !== data.password) {
      setCustomErrors({
        ...customErrors,
        password2: {
          type: 'value',
          message: 'Пароли не совпадают',
        },
      })
      return
    }
    setCustomErrors({})
    // TODO send validated data to API
    console.log(data)
  }
  // TODO uncomment next line in router context
  // const navigate = useNavigate()

  const goToLogin = (e: MouseEvent) => {
    e.preventDefault()
    // TODO replace console.log with navigate() in router context
    console.log('navigate to login')
    // navigate('/login')
  }

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
                    isInvalid={
                      errors[input.name] !== undefined ||
                      customErrors[input.name] !== undefined
                    }
                    {...register(input.name, {
                      required: 'Поле должно быть заполнено',
                      pattern: {
                        value: input.test,
                        message: input.message,
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[input.name]
                      ? String(errors[input.name]?.message)
                      : String(customErrors[input.name]?.message)}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            ))}

            <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button type="submit">Создать аккаунт</Button>
                <Button as="a" variant="link" onClick={goToLogin}>
                  Вход
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export { SignUp }
