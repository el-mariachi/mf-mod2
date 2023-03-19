import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { minMax } from '@utils/validations'
import './AddForumCommentForm.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { addComment } from '@store/slices/forum'
import { selectForum } from '@store/selectors'
import { LoadingStatus } from '@constants/user'

export type AddForumCommentFormProps = HTMLAttributes<HTMLDivElement> & {
  comment?: TopicComment
  topicId: number
  parentId?: number
  setEditMode?: (boolean) => void
}
type ForumCommentStruct = Record<'text', string>
const AddForumCommentForm: FC<AddForumCommentFormProps> = ({
  parentId,
  comment: commentToEdit,
  topicId,
  className: cls,
  setEditMode,
  ...attrs
}) => {
  const [readOnly, setReadOnly] = useState(false)
  const dispatch = useAppDispatch()
  const { loadingStatus } = useAppSelector(selectForum)
  const editMode = commentToEdit ? true : false

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ForumCommentStruct>({
    ...{
      mode: 'onTouched',
      reValidateMode: 'onChange',
    },
    ...(editMode && { values: { text: commentToEdit?.text ?? '' } }),
  })

  const [submitError, setSubmitError] = useState('')

  const formSubmit: SubmitHandler<ForumCommentStruct> = ({ text }) => {
    clearErrors()
    setReadOnly(true)
    if (commentToEdit) {
      dispatch(editComment({ ...commentToEdit, text }))
    } else {
      const comment = {
        ...{ text, topic_id: topicId },
        ...(parentId && { parent_id: parentId }),
      }
      dispatch(addComment(comment))
    }
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
            name: 'text',
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
          {editMode && (
            <Button
              className="ms-2"
              variant="secondary"
              onClick={() => setEditMode && setEditMode(false)}>
              Отменить
            </Button>
          )}
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumCommentForm
