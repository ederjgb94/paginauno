import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from './utils/subabase';

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
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const EditPage = () => {
    const refFirstName = useRef<HTMLInputElement>(null);
    const refLastName = useRef<HTMLInputElement>(null);
    const refUsertName = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const params = useParams()

    const [form, setForm] = useState<Formulario>(initialForm);
    const [data, setData] = useState<User>()

    const handleOnChange = ({ target }: { target: any }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });

        console.log(form)
    };



    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error, data } = await supabase.from('users').update(form).eq('id', params.id)

        if (error) {
            console.log(error);
            return;
        }
    }



    useEffect(() => {
        const fecthData = async () => {
            const { id } = params;

            const { error, data } = await supabase.from('users').select().eq('id', id);

            if (error) {
                console.log(error);
                return;
            }

            data?.forEach(user => {
                setData(user)
                setForm(user)
            });
        };

        fecthData();
    }, []);

    useEffect(() => {
        if (data) {
            refFirstName.current!.value = data.firstName
            refLastName.current!.value = data.lastName
            refUsertName.current!.value = data.username
            refPassword.current!.value = data.password
        }
    }, [data])


    return (
        <div>
            <h1>Editando el User {params.id}</h1>
            <Link to='/'>Home</Link>

            {data && <form name='usuarioForm' onSubmit={handleOnSubmit}>
                <input
                    name='firstName'
                    type='text'
                    placeholder='Introduce tu nombre'
                    ref={refFirstName}
                    onChange={handleOnChange}
                />
                <input
                    name='lastName'
                    type='text'
                    placeholder='Introduce tu apellido'
                    ref={refLastName}
                    onChange={handleOnChange}
                />

                <input
                    name='username'
                    type='text'
                    placeholder='Introduce tu username'
                    ref={refUsertName}
                    onChange={handleOnChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    ref={refPassword}
                    onChange={handleOnChange}
                />
                <input type='submit' value='Enviar' />
            </form>}

        </div>
    )
}
export default EditPage