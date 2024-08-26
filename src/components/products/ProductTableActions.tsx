import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IProduct } from '../../interface'

import { Button } from '@nextui-org/react'
import { LuEye, LuTrash2 } from 'react-icons/lu'
import { useAuthStore, useProductStore } from '../../stores'

interface Props {
    product: IProduct
}


export const ProductTableActions = ({ product }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    
    const { token } = useAuthStore();
    const { deleteProduct } = useProductStore()
    
    const navigate = useNavigate();

    const handleDeleteProduct = async () => {
        setIsLoading(true);
        await deleteProduct(product.id, token!);
        setIsLoading(false);
    }



    return (
        <div>
            {/* TODO: REDIRECCIONA A LA PAGINA DE LA CATEGORIA */}
            <Button
                onClick={() => navigate(`/admin/products/${ product.slug }`)}
                isIconOnly
                color='primary'
                variant='light'
                startContent={<LuEye size={18} />}
            />

            {/* ELIMINA LA CATEGORIA */}
            <Button
                isIconOnly
                color='danger'
                variant='light'
                onClick={handleDeleteProduct}
                startContent={<LuTrash2 size={18} />}
                isLoading={isLoading}
                isDisabled={isLoading}

            />



        </div>
    )
}
