
import { CategoriesTable, HeaderPage } from "../../components"



export const CategoriesPage = () => {




    return (
        <>
            <HeaderPage
                btnPath="/admin/categories/new"
                btnTitle="Nueva categoría"
                title="Categorías"
                description="Gestion de categorias de productos"
            />

            <CategoriesTable/>
   
        
        </>
    )
}
