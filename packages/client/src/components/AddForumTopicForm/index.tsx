import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
function AddForumTopicForm() {
  return (
    <div className="overflow-hidden p-1 pe-0">
      <Form className="add-topic-form form d-flex gap-2 float-end">
        <Form.Group controlId="formNewTopic">
          <Form.Control type="text" placeholder="Название новой темы" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Создать тему
        </Button>
      </Form>
    </div>
  )
}

export default AddForumTopicForm
