import { FC, HTMLAttributes, useState } from 'react'
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
  const dispatch = useAppDispatch()
  const { loadingStatus } = useAppSelector(selectForum)
  const editMode = commentToEdit ? true : false

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ForumCommentStruct>({
    ...{
      mode: 'onTouched',
      reValidateMode: 'onChange',
    },
    ...(editMode && { values: { text: commentToEdit?.text ?? '' } }),
  })

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
            {editMode? 'Изменить' : 'Отправить'}
          </SpinnerButton>
        </Form.Group>
      </Form>
    </div>
  )
}
export default AddForumCommentForm
