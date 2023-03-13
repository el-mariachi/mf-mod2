import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

type UploadFileProps = {
  options: { res: (value: unknown) => void } | Record<string, never>
}

export default ({ options }: UploadFileProps) => {
  const { res } = options
  const refFile = useRef<HTMLInputElement>(null)

  const onSubmit = () => {
    const input = refFile.current as HTMLInputElement
    const file = (input.files as FileList)[0] as Blob

    res(file)
  }

  const handleClose = () => {
    res(null)
  }

  return (
    <div className="confirm-password-modal">
      <Modal show={true} onHide={handleClose}>
        <Modal.Header className="px-4" closeButton>
          <Modal.Title>Выберите файл</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form.Group controlId="formFile" className="mb-0">
            <Form.Control type="file" ref={refFile} accept="image/*" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="px-4">
          <Button className="mb-1 me-2" onClick={onSubmit}>
            Выбрать
          </Button>
          <Button
            variant="outline-primary"
            className="mb-1"
            onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
