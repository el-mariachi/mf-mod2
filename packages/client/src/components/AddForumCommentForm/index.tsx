import { FC, HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { delay } from '@utils/index'
import { minMax } from '@utils/validations'
import './AddForumCommentForm.scss'

export type AddForumCommentFormProps = HTMLAttributes<HTMLDivElement> & {
  respondTo?: string
}
type ForumCommentStruct = Record<'comment', string>
const AddForumCommentForm: FC<AddForumCommentFormProps> = ({
  respondTo,
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
  } = useForm<ForumCommentStruct>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const [submitError, setSubmitError] = useState('')

  const formSubmit: SubmitHandler<ForumCommentStruct> = data => {
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
      })
  }

  return (
    <div className={classNames(cls, 'add-forum-comment-form')} {...attrs}>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {submitError ? <p className="text-danger mb-3">{submitError}</p> : null}
        <FormControl
          formName="forumCommentForum"
          register={register}
          errors={errors}
          readOnly={readOnly}
          controlProps={{
            name: 'topic_comment',
            label: '',
            type: 'textarea',
            placeholder: 'Текст комментария',
            validate: { minMax: minMax(1, 1024) },
          }}
        />
        <Form.Group>
          <SpinnerButton loading={loading}>Отправить</SpinnerButton>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumCommentForm
