import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroupView from '@components/FormGroupView'
import { changePasswordInputData, ChangePasswordFormStruct } from './constants'
import { useForm } from 'react-hook-form'

type ConfirmPasswordProps = {
  options:
    | {
        res: (value: unknown) => void
        newPassword: string
      }
    | Record<string, never>
}

export default ({ options: { res, newPassword } }: ConfirmPasswordProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChangePasswordFormStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      newPassword,
    },
  })

  const formSubmit = (data: ChangePasswordFormStruct) => {
    if (data.confirmPassword !== data.newPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'Пароли не совпадают',
      })
      return
    }
    clearErrors()
    res(data)
  }

  const handleClose = () => {
    res(null)
  }

  const formControls = changePasswordInputData.map((controlProps, index) => (
    <FormGroupView
      key={index}
      register={register}
      errors={errors}
      formName="changePasswordForm"
      controlProps={controlProps}
    />
  ))

  return (
    <div className="confirm-password-modal">
      <Modal show={true} onHide={handleClose}>
        <Modal.Header className="px-4" closeButton>
          <Modal.Title>Смена пароля</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(formSubmit)}>
          <Modal.Body className="p-4">{formControls}</Modal.Body>

          <Modal.Footer className="px-4 mt-n3">
            <Button className="mb-1 me-2" type="submit">
              Поменять пароль
            </Button>
            <Button
              variant="outline-primary"
              className="mb-1"
              onClick={handleClose}
              type="button">
              Отмена
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
