const ConfirmPasswordView = (res, rej, setShow) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
          }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};
