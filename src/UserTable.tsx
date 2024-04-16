import React from 'react';
import { Link } from 'react-router-dom';

interface UserTableProps {
    users: User[];
    deleteUser: (id: number) => void;
}

interface User {
    nombre: string;
    apellido: string;
    id: number;
}

const UserTable: React.FC<UserTableProps> = ({ users, deleteUser }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>
                                <Link className="nav-link" to={`/edit/${user.id}`}>
                                    <button>Editar</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    );
};

export default UserTable;