import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { editTopic, loadTopic } from '@store/slices/forum'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { inputData, defaultValues } from './constants'
//import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import './EditForumTopicForm.scss'
import { selectForum } from '@store/selectors'
export type EditForumTopicFormProps = HTMLAttributes<HTMLDivElement>
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoadingStatus } from '@constants/user'
import { selectTopics } from '@store/selectors'

const EditForumTopicForm: FC<EditForumTopicFormProps> = ({
  className: cls,
  ...attrs
}) => {
  const [topic, setTopic] = useState<Topic>()
  const { title = '', content = '' } = topic || {}
  const { id } = useParams()
  const topicId = Number(id)
  const topics = useAppSelector(selectTopics)
  const dispatch = useAppDispatch()
  const { loadingStatus } = useAppSelector(selectForum)

  useEffect(() => {
    /** ищем топик в сторе, если не находим, загружаем с сервера */
    const _topic: Topic | undefined = topics.find(item => item.id === topicId)
    if (_topic) {
      setTopic(_topic)
    } else {
      dispatch(loadTopic(Number(id)))
    }
  }, [topics])

  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()
  const [readOnly, setReadOnly] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Partial<Topic>>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues,
    values: { title, content },
  })

  const formSubmit: SubmitHandler<Partial<Topic>> = data => {
    clearErrors()
    setReadOnly(true)
    const updatedTopic = { ...topic, ...data } as Topic
    dispatch(editTopic(updatedTopic))
  }

  if (!topic)
    return (
      <SpinnerButton
        className="me-2"
        loading={loadingStatus === LoadingStatus.Succeeded}>
        Загрузка
      </SpinnerButton>
    )

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
    <div className={classNames(cls, 'edit-forum-topic-form')} {...attrs}>
      <h2 className="h4 fw-light mb-4">Редактирвание темы</h2>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {submitError ? <p className="text-danger mb-3">{submitError}</p> : null}
        {formControls}
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <SpinnerButton
              className="me-2"
              loading={loadingStatus === LoadingStatus.Loading}>
              Изменить
            </SpinnerButton>
            <Link to="..">
              <Button variant="secondary">Отменить</Button>
            </Link>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
export default EditForumTopicForm
