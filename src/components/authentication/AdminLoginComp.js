import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export const AdminLoginComp = ({ adminLogin, onSuccess }) => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await adminLogin(email, password);
      onSuccess();
    } catch (error) {
      setError('Credenciales de administrador inválidas');
    }
  };

  return (
    <form onSubmit={submitForm}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" required ref={emailRef} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" required ref={passwordRef} />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Iniciar Sesión
      </Button>
    </form>
  );
};
