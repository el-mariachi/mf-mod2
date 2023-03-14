import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { addTopic } from '@store/slices/forum'
import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { inputData, defaultValues, ForumTopicStruct } from './constants'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { delay } from '@utils/index'
import './AddForumTopicForm.scss'

export type AddForumTopicFormProps = HTMLAttributes<HTMLDivElement> & {
  mock2topic: () => void
  mock2list: () => void
}
const AddForumTopicForm: FC<AddForumTopicFormProps> = ({
  mock2topic,
  mock2list,
  className: cls,
  ...attrs
}) => {
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ForumTopicStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const [submitError, setSubmitError] = useState('')

  const formSubmit: SubmitHandler<ForumTopicStruct> = data => {
    clearErrors()
    setLoading(true)
    setReadOnly(true)

    delay(1000)
      .then(() => {
        // TODO
      })
      .catch((error: AppError) => formUserErrorHandler(error, setSubmitError))
      .finally(() => {
        setLoading(false)
        setReadOnly(false)
        mock2topic()
      })
  }

  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmitTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTopic(title))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const formControls = inputData.map((controlProps, index) => (
    <FormControl
      key={index}
      formName="forumTopicForum"
      register={register}
      errors={errors}
      readOnly={readOnly}
      controlProps={controlProps}
    />
  ))

  return (
    <div className={classNames(cls, 'add-forum-topic-form')} {...attrs}>
      <h2 className="h4 fw-light mb-4">Создание новой темы</h2>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {submitError ? <p className="text-danger mb-3">{submitError}</p> : null}
        {formControls}
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton className="me-2" loading={loading}>
              Создать
            </SpinnerButton>
            <Button variant="secondary" onClick={mock2list}>
              Отменить
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumTopicForm
