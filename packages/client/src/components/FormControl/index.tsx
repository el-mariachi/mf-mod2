import { FC } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
  return (
    <Form.Group
      as={Row}
      className="mb-3"
      controlId={`${formName}-${controlProps.name}`}>
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
  )
}

export default FormControl
