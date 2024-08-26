import { useEffect, useState } from 'react';

import { formatDate } from '../../lib'
import { useAuthStore, useProductStore } from '../../stores'

import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { ProductTableActions } from './ProductTableActions';

export const ProductTable = () => {

    const baseUrlImage = import.meta.env.VITE_IMAGE_URL;

    const [isLoadingTable, setIsLoadingTable] = useState(false);
    
    const token = useAuthStore(state => state.token);
    const products = useProductStore( state => state.products )
    const getProducts = useProductStore( state => state.getProducts )


    const handleFetchCategories = async () => {
        setIsLoadingTable(true);
        if (products.length === 0) {
            await getProducts(token!);
        }
        setIsLoadingTable(false);
    }

    useEffect(() => {
        handleFetchCategories();
    }, []);


    if ( isLoadingTable ) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
                <p>Cargando productos</p>
            </div>
        )
    }


    return (
        <section className='pt-8'>
            <Table className="container" aria-label="Categories Table">
                <TableHeader>
                    <TableColumn>Imagen</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Categoria</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Stock</TableColumn>
                    <TableColumn>Creacion</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>

                    {
                        products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img className='max-w-14' src={ baseUrlImage + product.image! } alt={ product.name } />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{ formatDate( product.createdAt ) }</TableCell>
                                <TableCell>
                                    <ProductTableActions product={ product } />
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </section>
    )
}
