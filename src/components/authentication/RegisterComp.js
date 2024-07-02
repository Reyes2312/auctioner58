import React, { useRef, useState, useContext } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

export const RegisterComp = ({ closeRegister, goBackToLogin }) => {
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();

  const { register } = useContext(AuthContext);

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = cmfPasswordRef.current.value;

    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      await register(email, password);
      closeRegister(); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoBack = () => {
    goBackToLogin(); 
  };

  return (
    <form onSubmit={submitForm}>
      <Modal.Body>
        {error && <Alert variant="danger" className="error-message">{error}</Alert>}
        <Form.Group>
          <Form.Label className="letraschidas">Correo electrónico</Form.Label>
          <Form.Control type="email" required ref={emailRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="letraschidas">Contraseña</Form.Label>
          <Form.Control type="password" required ref={passwordRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label className="letraschidas">Confirmar Contraseña</Form.Label>
          <Form.Control type="password" required ref={cmfPasswordRef} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleGoBack}>
          Atrás
        </Button>
        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Modal.Footer>
    </form>
  );
};
