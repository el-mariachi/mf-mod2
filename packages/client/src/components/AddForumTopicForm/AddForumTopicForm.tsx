import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
function AddForumTopicForm() {
  return (
    <Form className="add-topic-form form d-flex align-items-center gap-2">
      <Form.Group controlId="formNewTopic">
        <Form.Control type="text" placeholder="Название новой темы" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Создать тему
      </Button>
    </Form>
  )
}

export default AddForumTopicForm
