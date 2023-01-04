import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormGroupView from '../../components/FormGroupView'
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

  const formControls = changePasswordInputData.map(controlProps => (
    <FormGroupView
      register={register}
      errors={errors}
      formName="changePasswordForm"
      controlProps={controlProps}
    />
  ))

  return (
    <div className="confirm-password-modal">
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Смена пароля</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(formSubmit)}>
            {formControls}
            <Row xs={1} sm={2} className="mt-4">
              <Col sm={{ span: 5, offset: 4 }} className="mb-3">
                <Button variant="dark" type="submit">
                  Поменять пароль
                </Button>
              </Col>
              <Col sm={3} className="mb-3">
                <Button variant="secondary" onClick={handleClose} type="button">
                  Отмена
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
