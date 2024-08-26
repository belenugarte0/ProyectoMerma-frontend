
import { Button } from '@nextui-org/react'
import { LuEye, LuTrash2 } from 'react-icons/lu'

import { EditCategoryModal } from '..'
import { ISimpleCategory } from '../../interface'
import { useState } from 'react';
import { useAuthStore, useCategoryStore } from '../../stores';


interface Props {
    category: ISimpleCategory;
}

export const CategoriesTableActions = ({ category }: Props) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore(state => state.token);
    const deleteCategory = useCategoryStore( state => state.deleteCategory )

    const handleDeleteCategory = async () => {
        setIsLoading( true );

        await deleteCategory(category.id, token! );

        setIsLoading( false );


    }

    return (
        <div>
            {/* TODO: REDIRECCIONA A LA PAGINA DE LA CATEGORIA */}
            <Button
                isIconOnly
                color='primary'
                variant='light'
                startContent={<LuEye size={18} />}
            />

            {/* EDITA LA CATEGORIA */}
            <EditCategoryModal 
                category={ category }
            />

            {/* ELIMINA LA CATEGORIA */}
            <Button
                isIconOnly
                color='danger'
                variant='light'
                onClick={handleDeleteCategory}
                startContent={<LuTrash2 size={18} />}
                isLoading={isLoading}
                isDisabled={isLoading}
            />



        </div>
    )
}


