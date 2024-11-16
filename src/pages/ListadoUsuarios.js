import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './ListadoUsuarios.css';

function ListadoUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const navigate = useNavigate(); // Inicializa el hook de navegación

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('https://proyecto-final-lenguajesweb-backend.onrender.com/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar los usuarios', 'error');
        }
    };

    const actualizarUsuario = async () => {
        try {
            await axios.put(`https://proyecto-final-lenguajesweb-backend.onrender.com/usuarios/${usuarioEditado.idUsuario}`, usuarioEditado);
            Swal.fire('Éxito', 'Usuario actualizado', 'success');
            cargarUsuarios();
            setUsuarioEditado(null);
            navigate('/'); // Redirige a la página de inicio después de actualizar
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar el usuario', 'error');
        }
    };

    const eliminarUsuario = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
            });

            if (result.isConfirmed) {
                await axios.delete(`https://proyecto-final-lenguajesweb-backend.onrender.com/usuarios/${usuarioEditado.idUsuario}`);
                Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
                cargarUsuarios();
                setUsuarioEditado(null);
                navigate('/'); // Redirige a la página de inicio después de eliminar
            }
        } catch (error) {
            Swal.fire('Error', 'Error al eliminar el usuario', 'error');
        }
    };

    const handleEditClick = (usuario) => {
        setUsuarioEditado(usuario);
    };

    return (
        <div className="container">
            <div className="listado-usuarios">
                <h2>Listado de Usuarios</h2>
                <ul>
                    {usuarios.map((usuario) => (
                        <li 
                            key={usuario.idUsuario} 
                            onClick={() => handleEditClick(usuario)}
                            onMouseEnter={() => setUsuarioSeleccionado(usuario.idUsuario)}
                            onMouseLeave={() => setUsuarioSeleccionado(null)}
                            className={usuarioSeleccionado === usuario.idUsuario ? 'usuario-hover' : ''}
                        >
                            <p>Id Usuario: {usuario.idUsuario}</p>
                            <p>Nombre Completo: {usuario.nombreCompleto}</p>
                            <p>Tipo: {usuario.tipo}</p>
                            <p>Correo Electrónico: {usuario.correoElectronico}</p>
                            <p>Teléfono: {usuario.telefono}</p>
                            <p>Domicilio: {usuario.domicilio}</p>
                            {usuarioSeleccionado === usuario.idUsuario && (
                                <span className="seleccion-indicador">
                                    <i className="pi-user-edit"></i> Selecciona para editar o eliminar a un Usuario
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {usuarioEditado && (
                <div className="detalle-usuario">
                    <h3>Detalles del Usuario</h3>
                    <div className="form-group">
                        <label>Nombre Completo:</label>
                        <InputText value={usuarioEditado.nombreCompleto} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombreCompleto: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Tipo:</label>
                        <InputText value={usuarioEditado.tipo} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, tipo: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <InputText value={usuarioEditado.correoElectronico} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, correoElectronico: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <InputText value={usuarioEditado.telefono} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefono: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Domicilio:</label>
                        <InputText value={usuarioEditado.domicilio} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, domicilio: e.target.value })} />
                    </div>
                    <div className="botones-accion">
                        <Button label="Actualizar Usuario" onClick={actualizarUsuario} className="p-button-success" />
                        <Button label="Eliminar Usuario" onClick={eliminarUsuario} className="p-button-danger" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListadoUsuarios;
