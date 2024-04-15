import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from './utils/subabase';
import UserTable from './UserTable';


interface Formulario {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}

const initialForm: Formulario = {
  firstName: '',
  lastName: '',
  password: '',
  username: '',
};

interface User {
  nombre: string;
  apellido: string;
  id: number;
}

function App() {
  const [form, setForm] = useState<Formulario>(initialForm);
  const [users, setUsers] = useState<Array<User>>([]);

  const handleOnChange = ({ target }: { target: any }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, data } = await supabase.from('users').insert(form).select();

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);

    if (data) {

    }
  };

  const deleteUser = async (id: number) => {
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    setUsers(users.filter(user => user.id !== id));
  }


  useEffect(() => {
    const fecthData = async () => {
      const { error, data } = await supabase.from('users').select();

      if (error) {
        console.log(error);
        return;
      }

      setUsers([]); // Limpia la lista de usuarios antes de agregar nuevos

      data?.forEach(user => {
        const newUser: User = {
          nombre: user.firstName,
          apellido: user.lastName,
          id: user.id,
        };
        setUsers((prev) => [...prev, newUser]);
      });
    };

    fecthData();
  }, []);

  return (
    <div>
      <form name='usuarioForm' onSubmit={handleOnSubmit}>
        <input
          name='firstName'
          type='text'
          placeholder='Introduce tu nombre'
          onChange={handleOnChange}
        />
        <input
          name='lastName'
          type='text'
          placeholder='Introduce tu apellido'
          onChange={handleOnChange}
        />

        <input
          name='username'
          type='text'
          placeholder='Introduce tu username'
          onChange={handleOnChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={handleOnChange}
        />
        <input type='submit' value='Enviar' />
      </form>


      {/* Usa User Table y mandale los usuarios */}

      <UserTable users={users} deleteUser={(id) => {
        deleteUser(id);
      }} />
    </div>
  );
}

export default App;