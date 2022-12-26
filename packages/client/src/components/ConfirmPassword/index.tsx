import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormGroupView from '../../components/FormGroupView';
import { PASSWORD_FIELDS } from './constants';

type ConfirmPasswordProps = {
  options:
    | {
        res: (value: unknown) => void;
        newPassword: string;
      }
    | Record<string, never>;
};

export default ({ options: { res, newPassword } }: ConfirmPasswordProps) => {
  const [passwordData, setPasswordsData] = useState(
    PASSWORD_FIELDS.map(el => (el.name === 'newPassword' ? ((el.value = newPassword), el) : el))
  );

  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target as HTMLInputElement;
    setPasswordsData(passwordData.map(data => (data.name === name ? ((data.value = value), data) : data)));
  };

  const onSubmit = () => {
    //ToDo validate
    const passwords = passwordData.reduce(
      (prev, next) => (next.name !== 'newPassword2' ? ((prev[next.name] = next.value), prev) : prev),
      {} as { [key: string]: string }
    );
    res(passwords);
  };

  const handleClose = () => {
    res(null);
  };

  return (
    <div className="confirm-password-modal">
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Смена пароля</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {passwordData.map((data, i) => (
            <FormGroupView data={data} key={i} onInputChange={onInputChange} />
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={onSubmit}>
            Поменять пароль
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
