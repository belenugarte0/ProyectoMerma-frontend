import { useState } from 'react';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { useAuthStore, useCategoryStore } from '../../stores';
import { Button, Input, Textarea } from '@nextui-org/react'

export const NewCategoryForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const token = useAuthStore(state => state.token);
    const createCategory = useCategoryStore( state => state.createCategory );




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        
        setIsLoading(true);

        const { categoryName, description } = e.target as HTMLFormElement;

        if( categoryName.value.trim() === '' || description.value.trim() === ''){

            setIsLoading(false);
            
            toast.error('Error al guardar',{
                description: 'Todos los campos son requeridos'
            })
            
            return;
        } 


        await createCategory(categoryName.value, description.value, token!);

        setIsLoading(false);
        navigate('/admin/categories')

        
    }


    return (
        <section className='pt-8'>
            <form onSubmit={handleSubmit} className='container space-y-4'>

                <Input
                    label="Nombre"
                    placeholder='Ingrese un nombre para la categoria'
                    name='categoryName'
                />

                <Textarea
                    name='description'
                    placeholder='Ingrese la descripcion de la categoria'
                ></Textarea>


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
