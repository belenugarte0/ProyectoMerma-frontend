import React from 'react'
import { CartList, CheckoutForm, HeaderPage } from '../../components'
import { useCartStore } from '../../stores/cart/cart.store'

export const CheckoutPage = () => {

    const { cart } = useCartStore();


    return (
        <>
        
            <HeaderPage
                btnPath='/admin/cart'
                btnTitle='Ir al carrito'
                description='Genera una nueva venta'
                title='Finalizar venta'
            />

            {
                cart.length === 0
                
                ? (
                    <section className='container'>
                        <p>No hay productos en el carrito</p>
                    </section>
                )

                : (
                    <div className='checkout'>
                        <CartList/>
                        <CheckoutForm/>
                    </div>
                )
            }
        
        </>
    )
}
