import { Button } from '@nextui-org/react'
import { LuEye, LuTrash2 } from 'react-icons/lu'
import { EditUserModal } from './EditUserModal'
import { ISimpleUser } from '../../interface'
import { useState } from 'react';
import { useAuthStore, useUserStore } from '../../stores';


interface Props {
    user: ISimpleUser;
}

export const UsersTableActions = ({ user }: Props) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore(state => state.token);
    const deleteUser = useUserStore( state => state.deleteUser )

    const handleDeleteUser = async () => {
        setIsLoading( true );

        await deleteUser(user.id, token! );

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
            <EditUserModal 
                user={ user }
            />

            {/* ELIMINA LA CATEGORIA */}
            <Button
                isIconOnly
                color='danger'
                variant='light'
                onClick={handleDeleteUser}
                startContent={<LuTrash2 size={18} />}
                isLoading={isLoading}
                isDisabled={isLoading}
            />



        </div>
    )
}


