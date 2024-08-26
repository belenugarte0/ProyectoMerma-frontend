import { toast } from 'sonner'
import { Navigate, useParams } from 'react-router-dom'

import { useFetch } from '../../hooks'
import { IFullProductResponse } from '../../interface'

import { HeaderPage } from '../../components'
import { CircularProgress, Input, Textarea } from '@nextui-org/react'

export const ProductPage = () => {

    const { slug } = useParams()

    const { data, error, isLoading } = useFetch<IFullProductResponse>(`/products/${slug}`)
    const baseUrlImage = import.meta.env.VITE_IMAGE_URL;

    if( error ){
        toast.error(error)
        return <Navigate to={'/admin/products'}/>
    }

    if (isLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
                <p>Cargando producto</p>
            </div>
        )
    }


    return (
        <>
            <HeaderPage
                btnPath='/admin/products'
                btnTitle='Regresar'
                title={ !data ? '' : data?.product.name  }
                description='Descripcion completa del producto'
            />

            <section className='pt-8'>
                <div className='container grid grid-cols-2'>

                    <div className="space-y-4 w-full">
                        <Input
                            size='sm'
                            label="Nombre"
                            disabled
                            defaultValue={data?.product.name}
                            placeholder='Nombre del producto'
                            name='productName'
                        />

                        <Textarea
                            defaultValue={data?.product.description}
                            name='description'
                            disabled
                            label="Descripcion"
                            placeholder='Agrega una descripcion para el producto'
                        ></Textarea>

                        <Input
                            size='sm'
                            type="number"
                            min={0}
                            defaultValue={` ${data?.product.price} `}
                            step='0.01'
                            disabled
                            name='price'
                            label="Precio"
                            placeholder='Precio del producto para venta'
                        />

                        <Input
                            type="number"
                            name='stock'
                            disabled
                            min='0'
                            defaultValue={`${data?.product.stock}`}
                            size='sm'
                            label="Stock disponible"
                            placeholder='Stock disponible del producto'
                        />
                        <Input
                            type="text"
                            disabled
                            name='category'
                            defaultValue={data?.product.category.name}
                            size='sm'
                            label="Categoria"
                        />



                    </div>


                    <div className='w-full'>
                        <img src={baseUrlImage + data?.product.image} className='max-w-[400px] mx-auto' />
                    </div>

                </div>


            </section>
        </>

    )
}
