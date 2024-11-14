import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes agregar lógica adicional para manejar el logout, como limpiar el estado de autenticación
        navigate('/login');
    };

    return (
        <div className="home-container">
            {/* <Navbar /> */}
            <div className="home-content">
                <h2 className="welcome-text">¡Bienvenido al sistema de Gestión de Personal del STRM Seccion 47!</h2>
                <h1 className="home-title">!Usted ha Ingresado Correctamente¡</h1>
                <img src="/logostrm1.2.jpeg" alt="Logo STRM" className="home-logo" />
                <button className="logout-button" onClick={handleLogout}>Salir del Sistema</button>
            </div>
            <footer className="home-footer">
                <p>Dirección: Rio Tepalcatepec #1530, Fraccionamiento Rio Nuevo. Zamora Michoacán, México. Teléfono 351-51-54433</p>
            </footer>
        </div>
    );
}

export default Home;