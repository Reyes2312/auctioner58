import React, { useRef, useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import './LoginComp.css';

export const LoginComp = ({ closeLogin }) => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      closeLogin(); 
    } catch (error) {
      setError('Invalid login');
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
