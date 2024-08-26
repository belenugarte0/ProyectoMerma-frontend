
import { useCartStore } from '../../stores/cart/cart.store'

import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Button } from '@nextui-org/react';

export const CartList = () => {

    const { cart, incrementQuantity, decrementQuantity, removeProductToCart } = useCartStore();

    const baseUrlImage = import.meta.env.VITE_IMAGE_URL;


    return (
        <section className='col-span-2'>
            <ul className='space-y-6'>
                {
                    cart.map(item => (
                        <li key={item.id} className='cart__item'>
                            <div className='max-w-[80px]'>
                                <img src={ baseUrlImage + item.image } alt={ item.name }/>
                            </div>

                            <div className='space-y-2'>
                                <h4>Nombre: { item.name }</h4>
                                <p>Precio: { item.price }</p>

                                <div className='flex gap-2 items-center'>
                                    <Button
                                        startContent={ <LuMinus/> }
                                        isIconOnly
                                        onClick={() => decrementQuantity(item.id)}
                                        size='sm'
                                        className='rounded-full'
                                    />
                                    <p>Cantidad { item.quantity }</p>
                                    <Button
                                        startContent={ <LuPlus/> }
                                        isIconOnly
                                        size='sm'
                                        onClick={() => incrementQuantity(item.id)}
                                        className='rounded-full'
                                    />
                                    <Button
                                        startContent={ <LuTrash2/> }
                                        isIconOnly
                                        color='danger'
                                        size='sm'
                                        className='rounded-full'
                                        onClick={() => removeProductToCart(item.id)}
                                    />

                                </div>  
                            </div>


                        </li>
                    ))
                }


            </ul>
        </section>
    )
}
