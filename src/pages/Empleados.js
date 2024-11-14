import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './Empleados.css';

function Empleados() {
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        empresa: '',
        nombreCompleto: '',
        curp: '',
        fechaNacimiento: '',
        fechaIngresoEmpresa: '',
        especialidad: '',
        correoElectronicoE: '',
        telefonoE: '',
        domicilio: '',
    });
    const navigate = useNavigate();

    const agregarEmpleado = async () => {
        try {
            await axios.post('http://localhost:3000/empleados', nuevoEmpleado);
            Swal.fire('Éxito', 'Empleado agregado', 'success').then(() => {
                navigate('/empleados/listado');
            });    
            setNuevoEmpleado({
                empresa: '', nombreCompleto: '', curp: '', fechaNacimiento: '', 
                fechaIngresoEmpresa: '', especialidad: '', correoElectronicoE: '', 
                telefonoE: '', domicilio: ''
            });
            navigate('/empleados/listado'); // Redirige al listado de empleados
        } catch (error) {
            Swal.fire('Error', 'Error al agregar el empleado', 'error');
        }
    };

    return (
        <div className="empleados-container">
            <div className="empleados-content">
                <div className="empleados-form">
                    <h2>Agregar Nuevo Empleado</h2>
                    <InputText placeholder="Empresa" value={nuevoEmpleado.empresa} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, empresa: e.target.value })} />
                    <InputText placeholder="Nombre Completo" value={nuevoEmpleado.nombreCompleto} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombreCompleto: e.target.value })} />
                    <InputText placeholder="CURP" value={nuevoEmpleado.curp} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, curp: e.target.value })} />
                    <InputText placeholder="Fecha de Nacimiento" value={nuevoEmpleado.fechaNacimiento} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, fechaNacimiento: e.target.value })} />
                    <InputText placeholder="Fecha de Ingreso" value={nuevoEmpleado.fechaIngresoEmpresa} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, fechaIngresoEmpresa: e.target.value })} />
                    <InputText placeholder="Especialidad" value={nuevoEmpleado.especialidad} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, especialidad: e.target.value })} />
                    <InputText placeholder="Correo Electrónico" value={nuevoEmpleado.correoElectronicoE} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, correoElectronicoE: e.target.value })} />
                    <InputText placeholder="Teléfono" value={nuevoEmpleado.telefonoE} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, telefonoE: e.target.value })} />
                    <InputText placeholder="Domicilio" value={nuevoEmpleado.domicilio} onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, domicilio: e.target.value })} />
                    {/* <Button label="Agregar Empleado" onClick={agregarEmpleado} className="p-button-success" /> */}
                </div>
                <div className="empleados-botones">
                    <Button 
                        label="Agregar Empleado" 
                        icon="pi pi-user-plus" 
                        onClick={agregarEmpleado} 
                        className="custom-button" 
                    />
                    <Button 
                        label="Ver Listado de Empleados" 
                        icon="pi pi-user" 
                        onClick={() => navigate('/empleados/listado')} 
                        className="custom-button" 
                    />
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
        </div>
    );
}

export default Empleados;
