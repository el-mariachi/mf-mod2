import { FC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form'

type FormControlProps = {
  formName: string
  controlProps: ControlProps
  register: UseFormRegister<Fields>
  errors: Partial<FieldErrorsImpl>
  readOnly?: boolean
}

type Fields = FormControlProps['controlProps']['name']

const FormControl: FC<FormControlProps> = ({
  formName,
  register,
  errors,
  controlProps,
  readOnly,
}) => {
  const { name, type, label, placeholder, test, message, validate } =
    controlProps
  const pattern =
    test !== undefined && message !== undefined
      ? {
          value: test,
          message: message,
        }
      : undefined
  return (
    <Form.Group as={Row} className="mb-3" controlId={`${formName}-${name}`}>
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          type={type}
          as={'textarea' == type ? type : undefined}
          isInvalid={errors[name] !== undefined}
          placeholder={placeholder}
          {...register(name, {
            required: 'Поле должно быть заполнено',
            pattern,
            validate,
          })}
          readOnly={readOnly}
        />
        <Form.Control.Feedback type="invalid">
          {String(errors[name]?.message)}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

export default FormControl
