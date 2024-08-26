
import { HeaderPage, NewProductForm } from '../../components'

export const NewProductPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/products'
                btnTitle='Regresar'
                title='Agregar producto'
                description='Formulario para agregar productos en el inventario'
            />

            <NewProductForm/>

        </>
    )
}
