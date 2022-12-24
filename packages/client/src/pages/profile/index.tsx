import React, { useState, useMemo, createRef, FC } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { updatePassword, updateAvatar, updateProfile } from '../../services/userController';
import ProfileAvatar from '../../components/ProfileAvatar';
import ProfileForm from '../../components/ProfileForm';
import './index.css';

const yaResources = 'https://ya-praktikum.tech/api/v2/resources';

const EDIT = 'user-profile__data_edit';
const READ = 'user-profile__data_read';


type ProfileProps = {
  user: UserDTO | undefined
}

const Profile = ({user} : ProfileProps) => {
  const [readOnly, setReadOnly] = useState(true);
  //const [modalContent, setModalContent] = useState(() => <></>);
  //const [show, setShow] = useState(false);

  const refForm = createRef();


  const saveChanges = async () => {
    const form = refForm.current as HTMLFormElement;
    const formData = new FormData(form);
    const newPassword = formData.get('password') as string;
    formData.delete('password');
    if (newPassword) {
      //const passwords = await confirmNewPassword(newPassword);
      // await updatePassword(passwords);
    }
    await updateProfile(FormData);
  };

  const handleButtonClick = async () => {
    if (!readOnly) {
      //await saveChanges();
    }
    setReadOnly(!readOnly)
  };

  return (
    <div className="user-profile">
      <Container fluid="sm">
        <Form className="user-profile__form mt-5" ref={refForm as any}>
          <Row>
            <Col sm={4} className="px-0">
              <ProfileAvatar avatar={user?.avatar} />
            </Col>
            <Col sm={8} className='py-4 user-profile__form-wrapper'>
              <ProfileForm user={user} readOnly={readOnly} />

              <Button variant="dark" onClick={handleButtonClick}>
                {readOnly ? 'Изменить данные профиля' : 'Сохранить'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Profile;

/*
  const confirmNewPassword = async (newPassword: string) => {
    return new Promise((res, rej) => {
      setModalContent(ConfirmPasswordView(res, rej, setShow));
      setShow(true);
    });
  };

*/
