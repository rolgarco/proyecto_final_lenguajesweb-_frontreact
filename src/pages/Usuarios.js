import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import './Usuarios.css';

function Usuarios() {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombreCompleto: '',
        tipo: '',
        correoElectronico: '',
        password: '',
        telefono: '',
        domicilio: '',
    });
    const navigate = useNavigate();

    const agregarUsuario = async () => {
        try {
            await axios.post('http://localhost:3000/usuarios', nuevoUsuario);
            Swal.fire('Éxito', 'Usuario agregado', 'success').then(() => {
                navigate('/usuarios/listado'); 
            });
            setNuevoUsuario({ nombreCompleto: '', tipo: '', correoElectronico: '', password: '', telefono: '', domicilio: '' });
        } catch (error) {
            Swal.fire('Error', 'Error al agregar el usuario', 'error');
        }
    };

    return (
        <div className="usuarios-page-container">
            <div className="usuarios-container">
                <div className="formulario-contenedor">
                    <Card title="Agregar Nuevo Usuario">
                        <div className="form-group">
                            <InputText placeholder="Nombre Completo" value={nuevoUsuario.nombreCompleto} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombreCompleto: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <InputText placeholder="Tipo" value={nuevoUsuario.tipo} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, tipo: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <InputText placeholder="Correo Electrónico" value={nuevoUsuario.correoElectronico} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correoElectronico: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <InputText placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <InputText placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <InputText placeholder="Domicilio" value={nuevoUsuario.domicilio} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, domicilio: e.target.value })} />
                        </div>
                    </Card>
                </div>

                <div className="botones-contenedor">
                    <Button 
                        label="Agregar Usuario" 
                        icon="pi pi-user-plus" 
                        onClick={agregarUsuario} 
                        className="custom-button" 
                    />
                    <Button 
                        label="Ver Listado de Usuarios" 
                        icon="pi pi-user" 
                        onClick={() => navigate('/usuarios/listado')} 
                        className="custom-button" 
                    />
                </div>
            </div>

            <div className="regresar-boton">
                <Button 
                    label="Regresar" 
                    icon="pi pi-home" 
                    onClick={() => navigate('/')} 
                    className="p-button-secondary"
                />
            </div>
        </div>
    );
}

export default Usuarios;
