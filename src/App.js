// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Usuarios from './pages/Usuarios';
import Empleados from './pages/Empleados';
import ListadoUsuarios from './pages/ListadoUsuarios';
import ListadoEmpleados from './pages/ListadoEmpleados';
import Login from './components/Login';
import Home from './pages/Home';
import './App.css';
import 'primeicons/primeicons.css';



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/usuarios" element={isAuthenticated ? <Usuarios /> : <Navigate to="/login" />} />
                <Route path="/usuarios/listado" element={isAuthenticated ? <ListadoUsuarios /> : <Navigate to="/login" />}  />
                <Route path="/empleados" element={isAuthenticated ? <Empleados /> : <Navigate to="/login" />} />
                <Route path="/empleados/listado" element={isAuthenticated ? <ListadoEmpleados /> : <Navigate to="/login" />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
