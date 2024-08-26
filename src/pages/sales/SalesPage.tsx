
import { HeaderPage, SaleTable } from '../../components'

export const SalesPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/cart'
                btnTitle='Carrito de compras'
                description='Gestion de ventas'
                title='Ventas'
            />

            <SaleTable/>
        
        </>
    )
}
