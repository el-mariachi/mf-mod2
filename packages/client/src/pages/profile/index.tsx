import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AppError, formUserErrorHandler } from '@utils/errors_handling'
import { updatePassword, updateProfile } from '@services/userController'
import ProfileAvatar from '@components/ProfileAvatar'
import FormGroupView from '@components/FormGroupView'
import ConfirmPassword from '@components/ConfirmPassword'
import { profileFormInputs, READ_CLASS, EDIT_CLASS } from './constants'
import './index.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import emulateStore from './loadUserEmul'

enum Mode {
  Edit,
  View,
}

const Profile = () => {
  const [mode, setMode] = useState(Mode.View)
  const [modalOptions, setModalOptions] = useState({})
  const [submitError, setSubmitError] = useState('')
  // TODO uncomment and edit next line when we have redux store
  // const avatar = useSelector(state => state.user.avatar)
  // TODO remove next line when we have redux store
  const avatar = 'https://cdn-icons-png.flaticon.com/512/5953/5953714.png'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: async () => emulateStore(), // TODO replace emulateStore() call with useSelector() from redux
  })

  const saveChanges = async (formData: ProfileFormProps) => {
    const { password: newPassword } = formData
    delete formData.password

    if (newPassword) {
      const promise = new Promise(res => {
        setModalOptions({ res, newPassword })
      })

      const passwords = (await promise) as PasswordData | null
      setModalOptions({})

      if (passwords) {
        await updatePassword(passwords)
      }
    }
    await updateProfile(formData).catch((error: AppError) =>
      formUserErrorHandler(error, setSubmitError)
    )
  }

  const editMode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setMode(Mode.Edit)
  }

  const formSubmit: SubmitHandler<ProfileFormProps> = async data => {
    await saveChanges(data)
    setMode(Mode.View)
  }

  const formControls = profileFormInputs.map((controlProps, index) => (
    <FormGroupView
      key={index}
      register={register}
      errors={errors}
      formName="userProfileForm"
      controlProps={controlProps}
      readOnly={Boolean(mode)}
    />
  ))

  return (
    <div className="user-profile">
      <Container fluid="sm">
        <Form
          className="user-profile__form mt-5"
          onSubmit={handleSubmit(formSubmit)}>
          <Row>
            <Col sm={4} className="px-0">
              <ProfileAvatar avatar={avatar} />
            </Col>
            <Col sm={8} className="py-4 user-profile__form-wrapper">
              {submitError ? (
                <p className="text-danger mb-3">{submitError}</p>
              ) : (
                ''
              )}
              <div
                className={`user-profile__form ${
                  mode ? READ_CLASS : EDIT_CLASS
                }`}>
                {formControls}
              </div>
              {mode ? (
                <Button variant="dark" type="button" onClick={editMode}>
                  Изменить данные профиля
                </Button>
              ) : (
                <Button variant="dark" type="submit">
                  Сохранить
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
      {Object.keys(modalOptions).length !== 0 ? (
        <ConfirmPassword options={modalOptions} />
      ) : null}
    </div>
  )
}

export default Profile
