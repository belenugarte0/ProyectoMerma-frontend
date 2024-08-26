import { useState } from 'react';
import { useAuthStore } from '../../stores';


import { toast } from 'sonner';
import { Button, Input } from '@nextui-org/react'


export const LoginForm = () => {
    
    
    // const login = useAuthStore((state) => {
    //     return state.login;
    // });

    const login = useAuthStore( state => state.login );

    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsLoading(true);

        const { email, password } = e.target as HTMLFormElement;
        
        if( email.value.trim() === '' || password.value.trim() === ''){
            toast.error('Todos los campos son obligatorios')
            setIsLoading(false);
            return;
        }


        // TODO: STORE DEL AUTH
        await login( email.value, password.value );
        
        setIsLoading(false);

    }
    
    
    
    return (
        <div className='login__form'>
            <h3 className='font-bold text-2xl mb-4'>Inicia Sesion</h3>


            <form noValidate onSubmit={handleSubmit} className='space-y-4'>
                
                <Input
                    name='email'
                    isRequired
                    type='email'
                    size='sm'
                    label="Correo electrónico"
                />

                <Input
                    name='password'
                    type='password'
                    isRequired
                    size='sm'
                    label="Contraseña"
                />

                <Button
                    isLoading={ isLoading }
                    type='submit'
                    fullWidth
                    className='btn-primary'
                >
                    Iniciar Sesion
                </Button>
            </form>
            
        </div>
    )
}
