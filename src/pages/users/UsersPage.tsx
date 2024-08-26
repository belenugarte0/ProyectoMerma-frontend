import { UsersTable, HeaderPage } from "../../components"



export const UsersPage = () => {




    return (
        <>
            <HeaderPage
                btnPath="/admin/users/new"
                btnTitle="Nuevo Usuario"
                title="Usuarios"
                description="Gestion de Usuarios"
            />

            <UsersTable/>
   
        
        </>
    )
}
