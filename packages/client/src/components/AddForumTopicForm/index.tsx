import { FC, HTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
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
  return (
    <div className="overflow-hidden p-1 pe-0">
      <Form className="add-topic-form form d-flex gap-2 float-end">
        <Form.Group controlId="formNewTopic">
          <Form.Control type="text" placeholder="Название новой темы" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={mock2topic}>
          Создать тему
        </Button>
        <Button onClick={mock2list}>Отменить</Button>
      </Form>
    </div>
  )
}

export default AddForumTopicForm
