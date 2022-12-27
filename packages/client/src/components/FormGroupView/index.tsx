import React, { FormEventHandler, ReactEventHandler } from 'react';
import { Form } from 'react-bootstrap';


type FormGroupViewProps = {
  data: ProfileInputProps,
  readOnly?: boolean,
  onInputChange: React.ReactEventHandler
}

export default ({ data, readOnly, onInputChange }: FormGroupViewProps) => {
  const { name, type, value, label, placeholder } = data;
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onInputChange}
      />
    </Form.Group>
  );
};
