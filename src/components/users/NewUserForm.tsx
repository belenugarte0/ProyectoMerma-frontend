import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from '../../stores';
import { Button, Input } from '@nextui-org/react';

export const NewUserForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const createUser = useUserStore(state => state.createUser);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const userName = (form.elements.namedItem('userName') as HTMLInputElement).value.trim();
        const userLastname = (form.elements.namedItem('userLastname') as HTMLInputElement).value.trim();
        const userDocumento = (form.elements.namedItem('userDocumento') as HTMLInputElement).value.trim();
        const userEmail = (form.elements.namedItem('useremail') as HTMLInputElement).value.trim();
        const userPhone = (form.elements.namedItem('userphone') as HTMLInputElement).value.trim();


        if (userName === '' || userLastname === '' || userDocumento === '' || userEmail === '' || userPhone === '') {
            setIsLoading(false);
            toast.error('Error al guardar', {
                description: 'Todos los campos son requeridos'
            });
            return;
        }

        await createUser(userName, userLastname, userDocumento, userEmail, userPhone, token!);

        setIsLoading(false);
        navigate('/admin/users');
    };

    return (
        <section className='pt-8'>
            <form onSubmit={handleSubmit} className='container space-y-4'>
                <Input
                    label="Nombre"
                    placeholder='Ingrese el nombre del usuario'
                    name='userName'
                />
                <Input
                    label="Apellido"
                    placeholder='Ingrese el apellido del usuario'
                    name='userLastname'
                />
                <Input
                    label="Documento"
                    placeholder='Ingrese el Documento del Usuario'
                    name='userDocumento'
                />
                <Input
                    label="Correo"
                    placeholder='Ingrese el Correo del Usuario'
                    name='useremail'
                />
                <Input
                    label="Teléfono"
                    placeholder='Ingrese el Teléfono del Usuario'
                    name='userphone'
                />
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
};
