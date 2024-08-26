import React from 'react'
import { HeaderPage, ProductList } from '../../components'

export const CartPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/checkout'
                btnTitle='Finalizar compra'
                description='Agrega productos al carrito'
                title='Carrito de compras'
            />

            <ProductList/>
        
        
        </>
    )
}
