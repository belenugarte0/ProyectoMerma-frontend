
import { RolesTable, HeaderPage } from "../../components"



export const RolesPage = () => {




    return (
        <>
            <HeaderPage
                btnPath="/admin/roles/new"
                btnTitle="Nueva categoría"
                title="Categorías"
                description="Gestion de categorias de productos"
            />

            <RolesTable/>
   
        
        </>
    )
}
