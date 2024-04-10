import React, { useState } from 'react';

interface UserFormProps {
    addUser: (user: User) => void;
    updateUser: (id: number, user: User) => void;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const UserForm: React.FC<UserFormProps> = ({ addUser, updateUser }) => {
    const [user, setUser] = useState<User>({ id: 0, name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.id === 0) {
            addUser(user);
        } else {
            updateUser(user.id, user);
        }
        setUser({ id: 0, name: '', email: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default UserForm;