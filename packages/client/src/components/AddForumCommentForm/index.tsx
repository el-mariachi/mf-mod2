import { FC, HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import FormControl from '@components/FormControl'
import SpinnerButton from '@components/SpinnerButton'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { minMax } from '@utils/validations'
import './AddForumCommentForm.scss'
import { useAppDispatch, useAppSelector } from '@hooks/redux_typed_hooks'
import { addComment, editComment } from '@store/slices/forum'
import { selectForum } from '@store/selectors'
import { LoadingStatus } from '@constants/user'
import { AppError, formUserErrorHandler } from '@utils/errorsHandling'
import { SerializedError } from '@reduxjs/toolkit'

export type AddForumCommentFormProps = HTMLAttributes<HTMLDivElement> & {
  comment?: TopicComment
  topicId: number
  parentId?: number
}
type ForumCommentStruct = Record<'text', string>
const AddForumCommentForm: FC<AddForumCommentFormProps> = ({
  parentId,
  comment: commentToEdit,
  topicId,
  className: cls,
  ...attrs
}) => {
  const [readOnly, setReadOnly] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dispatch = useAppDispatch()
  const { loadingStatus, topics } = useAppSelector(selectForum)
  const editMode = commentToEdit ? true : false

  const {
    register,
    handleSubmit,
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm<ForumCommentStruct>({
    ...{
      mode: 'onTouched',
      reValidateMode: 'onChange',
      defaultValues: { text: '' },
    },
    ...(editMode && { values: { text: commentToEdit?.text ?? '' } }),
  })

  /** обновляем форму после добавления коммента */
  useEffect(() => {
    resetField('text')
    setReadOnly(false)
  }, [topics])

  const formSubmit: SubmitHandler<ForumCommentStruct> = async ({ text }) => {
    clearErrors()
    setReadOnly(true)
    try {
      if (commentToEdit) {
        await dispatch(editComment({ ...commentToEdit, text })).unwrap()
      } else {
        const comment = {
          ...{ text, topic_id: topicId },
          ...(parentId && { parent_id: parentId }),
        }
        await dispatch(addComment(comment)).unwrap()
      }
    } catch (error) {
      const { message, code } = error as SerializedError
      formUserErrorHandler(
        AppError.create(message || '', Number(code)),
        setSubmitError
      )
    }
  }

  return (
    <div className={classNames(cls, 'add-forum-comment-form')} {...attrs}>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {submitError ? <p className="text-danger mb-4">{submitError}</p> : null}
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
            {editMode ? 'Изменить' : 'Отправить'}
          </SpinnerButton>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumCommentForm
