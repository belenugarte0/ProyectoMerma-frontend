import { HeaderPage, NewUserForm } from '../../components'

export const NewUserPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/users'
                btnTitle='Regresar'
                description='Crea un usuario en el sistema'
                title='Nuevo Usuario'
            />
            <NewUserForm/>

        </>
    )
}
