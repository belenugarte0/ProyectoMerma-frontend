import React, { useEffect } from 'react'
import { useAuthStore, useProductStore } from '../../stores'
import { ProductCard } from './ProductCard';

export const ProductList = () => {
    const { products, getProducts } = useProductStore();
    const { token } = useAuthStore()

    useEffect(() => {
      
        if( products.length === 0 ){
            getProducts(token!);
        }

    }, [])
    

    return (
        <section className='pt-8'>
            <div className='container'>
                <ul className='product__list'>
                    {
                        products.map(product => (
                            <ProductCard key={ product.id } product={product}/>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
