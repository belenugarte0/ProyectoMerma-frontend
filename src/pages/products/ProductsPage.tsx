
import { HeaderPage, ProductTable } from '../../components'

export const ProductsPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='new'
                btnTitle='Registrar producto'
                title='Productos registrados'
                description='Listado y gestion de productos en el inventario'
            />
        
            <ProductTable/>

        </>
    )
}
