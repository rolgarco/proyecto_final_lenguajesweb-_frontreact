import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'sweetalert2';
import './Login.css'; // Asegúrate de crear este archivo CSS

function Login({ onLoginSuccess }) {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Hacer la solicitud al backend para verificar las credenciales
            const response = await axios.post('http://localhost:3000/login', {
                correoElectronico,
                password
            });

            // Si el login es exitoso, llamar a la función para actualizar el estado
            if (response.data === 'Login exitoso') {
                onLoginSuccess();
                navigate('/home');  // Redirigir al usuario a la página de inicio o home
            }
        } catch (error) {
            SweetAlert.fire({
                icon: 'error',
                title: 'Error',
                text: 'Credenciales incorrectas'
            });
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <img src="/logostrm1.2.jpeg" alt="Logo" className="login-logo" />
                <h1>Bienvenido al Sistema de Gestión de Personal del STRM Sección 47</h1>
            </header>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <div className="form-group">
                        <label htmlFor="correoElectronico">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correoElectronico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <footer className="login-footer">
                <p>Dirección: Rio Tepalcatepec #1530, Fraccionamiento Rio Nuevo. Zamora Michoacán, México. Teléfono 351-51-54433</p>
            </footer>
        </div>
    );
}

export default Login;