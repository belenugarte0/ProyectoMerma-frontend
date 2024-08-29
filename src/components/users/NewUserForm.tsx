import { useState } from 'react';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { useAuthStore, useUserStore } from '../../stores';
import { Button, Input } from '@nextui-org/react'

export const NewUserForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const token = useAuthStore(state => state.token);
    const createUser = useUserStore( state => state.createUser );




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        
        setIsLoading(true);



        const { userName, lastname, document, email, phone} = e.target as HTMLFormElement;

        if( userName.value.trim() === '' || lastname.value.trim() === '' || document.value.trim() === '' || email.value.trim() === '' || phone.value.trim() === ''){

            setIsLoading(false);
            
            toast.error('Error al guardar',{
                description: 'Todos los campos son requeridos'
            })
            
            return;
        } 
        
        await createUser(userName.value, lastname.value, document.value, email.value, phone.value, token!);

        setIsLoading(false);
        navigate('/admin/users')

        
    }

    return (
        <section className='pt-8'>
            <form onSubmit={handleSubmit} className='container space-y-4'>

                <Input
                    label="Nombre"
                    placeholder='Ingrese un nombre para la categoria'
                    name='userName'
                />

                <Input
                    label="Apellido"
                    placeholder='Ingrese un nombre para la categoria'
                    name='lastname'
                />
                
                <Input
                    label="Documento"
                    placeholder='Ingrese un nombre para la categoria'
                    name='document'
                />

                <Input
                    label="Correo"
                    placeholder='Ingrese un nombre para la categoria'
                    name='email'
                />
                
                <Input
                    label="Telefono"
                    placeholder='Ingrese un nombre para la categoria'
                    name='Phone'
                />


                <Button
                    isLoading={isLoading}
                    isDisabled={ isLoading }
                    type='submit'
                    className='btn-primary'
                >Guardar</Button>

            </form>


        </section>
    )
}
 
/*
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore, useRoleStore } from '../../stores'; // Asegúrate de tener un hook para roles
import { Button, Input, Select } from '@nextui-org/react';

export const NewUserForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const createUser = useUserStore(state => state.createUser);
    const fetchRoles = useRoleStore(state => state.fetchRoles); // Hook para obtener roles

    useEffect(() => {
        const getRoles = async () => {
            try {
                const roles = await fetchRoles(); // Asume que fetchRoles devuelve una lista de roles
                setRoles(roles);
            } catch (error) {
                toast.error('Error al cargar los roles', {
                    description: 'No se pudieron obtener los roles'
                });
            }
        };

        getRoles();
    }, [fetchRoles]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { userName, lastname, document, email, phone } = e.target as typeof e.target & {
            userName: { value: string };
            lastname: { value: string };
            document: { value: string };
            email: { value: string };
            phone: { value: string };
        };

        if (
            userName.value.trim() === '' ||
            lastname.value.trim() === '' ||
            document.value.trim() === '' ||
            email.value.trim() === '' ||
            !selectedRole
        ) {
            setIsLoading(false);
            toast.error('Error al guardar', {
                description: 'Todos los campos son requeridos'
            });
            return;
        }

        await createUser(userName.value, lastname.value, document.value, email.value, phone.value, selectedRole, token!);

        setIsLoading(false);
        navigate('/admin/users');
    };

    return (
        <section className='pt-8'>
            <form onSubmit={handleSubmit} className='container space-y-4'>
                <Input
                    label="Nombre"
                    placeholder='Ingrese un nombre'
                    name='userName'
                />
                <Input
                    label="Apellido"
                    placeholder='Ingrese un apellido'
                    name='lastname'
                />
                <Input
                    label="Documento"
                    placeholder='Ingrese el documento'
                    name='document'
                />
                <Input
                    label="Correo"
                    placeholder='Ingrese el correo electrónico'
                    name='email'
                />
                <Input
                    label="Teléfono"
                    placeholder='Ingrese el teléfono'
                    name='phone'
                />
                <Select
                    label="Rol"
                    placeholder='Seleccione un rol'
                    value={selectedRole}
                    onChange={(value) => setSelectedRole(value)}
                    name='role'
                >
                    {roles.map(role => (
                        <Select.Option key={role.id} value={role.id}>
                            {role.name}
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    type='submit'
                    className='btn-primary'
                >
                    Guardar
                </Button>
            </form>
        </section>
    );
};*/