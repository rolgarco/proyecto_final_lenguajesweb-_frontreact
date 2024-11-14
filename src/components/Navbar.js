// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const items = [
        { label: 'Usuarios', icon: 'pi pi-fw pi-users', path: '/usuarios' },
        { label: 'Empleados', icon: 'pi pi-fw pi-user', path: '/empleados' },
        { label: 'Comité Local', icon: 'pi pi-fw pi-briefcase', path: '/comite-local' },
        { label: 'Procesos', icon: 'pi pi-fw pi-cog', path: '/procesos' },
    ];

    return (
        <div className="navbar">
            {items.map((item, index) => (
                <Link key={index} to={item.path} className="nav-button">
                    <i className={item.icon} style={{ marginRight: '8px' }}></i>
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
