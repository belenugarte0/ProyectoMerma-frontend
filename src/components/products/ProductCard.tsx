
import { LuShoppingCart } from 'react-icons/lu';
import { IProduct } from '../../interface'
import { Button } from '@nextui-org/react';
import { useCartStore } from '../../stores/cart/cart.store';

interface Props {
    product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
    
    const baseUrlImage = import.meta.env.VITE_IMAGE_URL;

    const { addProductToCart } = useCartStore();


    return (
        <li className='product__card'>
            <img className='mb-4' src={ baseUrlImage + product.image } alt={ product.name } />

            <h3 className='font-bold'>{ product.name }</h3>

            <div className='mb-2 text-sm'>
                <p>{ product.category.name }</p>
                <p>Precio: { product.price }$</p>
                <p>Stock: { product.stock }u.</p>
            </div>

            <Button 
                onClick={() => addProductToCart(product)}
                startContent={ <LuShoppingCart/> }
                fullWidth
                className='btn-primary' >Agregar al carrito</Button>
        </li>
    )
}
