import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import './AddForumCommentForm.scss'

export type AddForumCommentFormProps = HTMLAttributes<HTMLDivElement> & {
  // ... 
}
const AddForumCommentForm: FC<AddForumCommentFormProps> = ({ 
  className: cls,
  ...attrs 
}) => {  
  return (
    <div className="forum-topic__container border d-flex align-items-center justify-content-between">
      тут текстовое поле
      <Button variant="secondary">Отправить</Button>
    </div>
  )
}
export default AddForumCommentForm
