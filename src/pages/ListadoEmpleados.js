import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './ListadoEmpleados.css';

function ListadoEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [empleadoEditado, setEmpleadoEditado] = useState(null);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const response = await axios.get('https://proyecto-final-lenguajesweb-backend.onrender.com/empleados');
            const empleadosFormateados = response.data.map(emp => ({
                ...emp,
                fechaNacimiento: emp.fechaNacimiento ? emp.fechaNacimiento.substring(0, 10) : '',
                fechaIngresoEmpresa: emp.fechaIngresoEmpresa ? emp.fechaIngresoEmpresa.substring(0, 10) : ''
            }));
            setEmpleados(empleadosFormateados);
        } catch (error) {
            Swal.fire('Error', 'Error al cargar los empleados', 'error');
        }
    };

    const actualizarEmpleado = async () => {
        try {
            await axios.put(`https://proyecto-final-lenguajesweb-backend.onrender.com/empleados/${empleadoEditado.idEmpleados}`, empleadoEditado);
            Swal.fire('Éxito', 'Empleado actualizado', 'success');
            cargarEmpleados();
            setEmpleadoEditado(null);
            setEmpleadoSeleccionado(null);
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar el empleado', 'error');
        }
    };

    const eliminarEmpleado = async () => {
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
                await axios.delete(`https://proyecto-final-lenguajesweb-backend.onrender.com/empleados/${empleadoEditado.idEmpleados}`);
                Swal.fire('Eliminado', 'Empleado eliminado correctamente', 'success');
                cargarEmpleados();
                setEmpleadoEditado(null);
                setEmpleadoSeleccionado(null);
            }
        } catch (error) {
            Swal.fire('Error', 'Error al eliminar el empleado', 'error');
        }
    };

    const handleEditClick = (empleado) => {
        setEmpleadoEditado(empleado);
        setEmpleadoSeleccionado(empleado.idEmpleados);
    };

    return (
        <div className="container">
            <div className="listado-empleados">
                <h2>Listado de Empleados</h2>
                <ul>
                    {empleados.map((empleado) => (
                        <li 
                            key={empleado.idEmpleados} 
                            onClick={() => handleEditClick(empleado)}
                            onMouseEnter={() => setEmpleadoSeleccionado(empleado.idEmpleados)}
                            onMouseLeave={() => setEmpleadoSeleccionado(null)}
                            className={empleadoSeleccionado === empleado.idEmpleados ? 'empleado-hover' : ''}
                        >
                            <p>Empresa: {empleado.empresa}</p>
                            <p>Nombre Completo: {empleado.nombreCompleto}</p>
                            <p>CURP: {empleado.curp}</p>
                            <p>Fecha de Nacimiento: {empleado.fechaNacimiento}</p>
                            <p>Fecha de Ingreso: {empleado.fechaIngresoEmpresa}</p>
                            <p>Especialidad: {empleado.especialidad}</p>
                            <p>Correo Electrónico: {empleado.correoElectronicoE}</p>
                            <p>Teléfono: {empleado.telefonoE}</p>
                            <p>Domicilio: {empleado.domicilio}</p>
                            {empleadoSeleccionado === empleado.idEmpleados && (
                                <span className="seleccion-indicador">
                                    <i className="pi pi-pencil"></i> Selecciona para editar o eliminar
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {empleadoEditado && (
                <div className="detalle-empleado">
                    <h3>Detalles del Empleado</h3>
                    <div className="form-group">
                        <label>Nombre Completo:</label>
                        <InputText value={empleadoEditado.nombreCompleto} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, nombreCompleto: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Especialidad:</label>
                        <InputText value={empleadoEditado.especialidad} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, especialidad: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <InputText value={empleadoEditado.correoElectronicoE} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, correoElectronicoE: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <InputText value={empleadoEditado.telefonoE} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, telefonoE: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Domicilio:</label>
                        <InputText value={empleadoEditado.domicilio} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, domicilio: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Nacimiento:</label>
                        <InputText value={empleadoEditado.fechaNacimiento} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, fechaNacimiento: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Ingreso:</label>
                        <InputText value={empleadoEditado.fechaIngresoEmpresa} onChange={(e) => setEmpleadoEditado({ ...empleadoEditado, fechaIngresoEmpresa: e.target.value })} />
                    </div>
                    <div className="botones-accion">
                        <Button label="Actualizar Empleado" onClick={actualizarEmpleado} className="p-button-success" />
                        <Button label="Eliminar Empleado" onClick={eliminarEmpleado} className="p-button-danger" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListadoEmpleados;
