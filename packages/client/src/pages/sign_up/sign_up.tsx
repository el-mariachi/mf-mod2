import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useForm } from 'react-hook-form'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './sign_up.scss'
import { inputData } from './constants'
import { MouseEvent, useState } from 'react'
// import {} from 'react-router-dom'

const SignUp = () => {
  const [inputs, setInputs] = useState(inputData)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
  })

  const formSubmit = (data: any) => {
    console.log(data)
  }

  const goToLogin = (e: MouseEvent) => {
    e.preventDefault()
    console.log('nav')
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

            {inputs.map((input, index) => (
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
