import React, { useContext, useState, useEffect, useRef } from 'react';
import './NavComp.css';
import logoImg from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import { AdminLoginComp } from './AdminLoginComp';
import { Modal } from 'react-bootstrap';

export const NavComp = () => {
  const { currentUser, adminUser, logout, adminLogin } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showFullscreenGif, setShowFullscreenGif] = useState(false);

  const gifRef = useRef();

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeRegister = () => setShowRegister(false);

  const openAdminLogin = () => {
    setShowAdminLogin(true);
    setShowLogin(false);
  };

  const closeAdminLogin = () => setShowAdminLogin(false);

  const handleAdminLoginSuccess = () => {
    closeAdminLogin();
  };

  const goBackToLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const toggleFullscreenGif = () => setShowFullscreenGif(!showFullscreenGif);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gifRef.current && !gifRef.current.contains(event.target)) {
        setShowFullscreenGif(false);
      }
    };

    if (showFullscreenGif) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFullscreenGif]);

  return (
    <>
      <nav className="navbar sticky-top">
        <div className="container">
          <div className="navbar-brand" onClick={toggleFullscreenGif}>
            <img src={logoImg} alt="logo" />
          </div>
          <div className="d-flex justify-content-end">
            {currentUser || adminUser ? (
              <>
                <div className="btn mx-2 disabled">
                  {currentUser ? currentUser.email : adminUser.email}
                </div>
                <div onClick={logout} className="btn mx-2">
                  Salir de cuenta
                </div>
              </>
            ) : (
              <div className="btn mx-2" onClick={openLogin}>
                Iniciar Sesión
              </div>
            )}
          </div>
        </div>

        <Modal centered show={showLogin} onHide={closeLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginComp closeLogin={closeLogin} />
            <div className="mt-3">
              No tienes una cuenta?{' '}
              <span className="register-link" onClick={openRegister}>
                Regístrate aquí
              </span>
            </div>
            <div className="mt-3">
              ¿Eres administrador?{' '}
              <span className="admin-login-link" onClick={openAdminLogin}>
                Iniciar sesión 
              </span>
            </div>
          </Modal.Body>
        </Modal>

        <Modal centered show={showRegister} onHide={closeRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Registrarse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterComp closeRegister={closeRegister} goBackToLogin={goBackToLogin} />
          </Modal.Body>
        </Modal>

        <Modal centered show={showAdminLogin} onHide={closeAdminLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesión Administrador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminLoginComp adminLogin={adminLogin} onSuccess={handleAdminLoginSuccess} />
          </Modal.Body>
        </Modal>
      </nav>

      {showFullscreenGif && (
        <div className="fullscreen-gif">
          <div className="gif-wrapper" ref={gifRef}>
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnB5aW1xNmhhM3V4cDl4eW83dHJqbmkwY3YxcnBsc2NtYXFzc3BsdiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9cw/9FxnGR8rfCls53s6tM/giphy.webp"
              alt="fullscreen gif"
            />
          </div>
        </div>
      )}
    </>
  );
};
