import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { minMax } from '@utils/validations'
import './AddForumCommentForm.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { addComment } from '@store/slices/forum'
import { selectForum } from '@store/selectors'
import { LoadingStatus } from '@constants/user'

export type AddForumCommentFormProps = HTMLAttributes<HTMLDivElement> & {
  respondTo?: string
  topicId: number
}
type ForumCommentStruct = Record<'comment', string>
const AddForumCommentForm: FC<AddForumCommentFormProps> = ({
  respondTo,
  topicId,
  className: cls,
  ...attrs
}) => {
  const [readOnly, setReadOnly] = useState(false)
  const dispatch = useAppDispatch()
  const { loadingStatus } = useAppSelector(selectForum)

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
    setReadOnly(true)
    const comment = { text: data.comment, topic_id: topicId }
    dispatch(addComment(comment))
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
            name: 'comment',
            label: '',
            type: 'textarea',
            placeholder: 'Текст комментария',
            validate: { minMax: minMax(1, 1024) },
          }}
        />
        <Form.Group>
          <SpinnerButton loading={loadingStatus === LoadingStatus.Loading}>
            Отправить
          </SpinnerButton>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumCommentForm
