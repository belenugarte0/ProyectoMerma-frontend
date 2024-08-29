
import { Button } from '@nextui-org/react'
import { LuEye, LuTrash2 } from 'react-icons/lu'

import { EditRolModal } from '..'
import { ISimpleRol } from '../../interface'
import { useState } from 'react';
import { useAuthStore, useRolStore } from '../../stores';


interface Props {
    rol: ISimpleRol;
}

export const RolesTableActions = ({ rol }: Props) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore(state => state.token);
    const deleteRol = useRolStore( state => state.deleteRol )

    const handleDeleteRol = async () => {
        setIsLoading( true );

        await deleteRol(rol.id, token! );

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
            <EditRolModal 
                rol={ rol }
            />

            {/* ELIMINA LA CATEGORIA */}
            <Button
                isIconOnly
                color='danger'
                variant='light'
                onClick={handleDeleteRol}
                startContent={<LuTrash2 size={18} />}
                isLoading={isLoading}
                isDisabled={isLoading}
            />



        </div>
    )
}


