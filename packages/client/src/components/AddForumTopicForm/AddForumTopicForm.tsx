import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
function AddForumTopicForm() {
  return (
    <div className="overflow-hidden">
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
