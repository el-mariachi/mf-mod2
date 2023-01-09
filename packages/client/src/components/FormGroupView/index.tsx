import Form from 'react-bootstrap/Form'
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form'

type FormGroupViewProps = {
  formName: string
  controlProps: ControlProps
  register: UseFormRegister<Fields>
  errors: Partial<FieldErrorsImpl>
  readOnly?: boolean
}

type Fields = FormGroupViewProps['controlProps']['name']

export default ({
  controlProps,
  readOnly,
  register,
  errors,
  formName,
}: FormGroupViewProps) => {
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
    <Form.Group className="mb-3" controlId={`${formName}-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        isInvalid={errors[name] !== undefined}
        placeholder={placeholder}
        disabled={readOnly}
        {...register(name, {
          required: name === 'password' ? false : 'Поле должно быть заполнено',
          pattern,
          validate: name === 'password' ? undefined : validate,
        })}
      />
      <Form.Control.Feedback type="invalid">
        {String(errors[name]?.message)}
      </Form.Control.Feedback>
    </Form.Group>
  )
}
