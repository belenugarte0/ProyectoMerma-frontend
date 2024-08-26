import { useEffect, useState } from 'react';

import { formatDate } from '../../lib'
import { useAuthStore, useSaleStore } from '../../stores'

import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'


export const SaleTable = () => {

    const { token } = useAuthStore();
    const { sales, getAllSales } = useSaleStore();

    const [isLoading, setIsLoading] = useState(false)

    const handleFetchSales = async () => {

        setIsLoading(true);
        
        if( sales.length === 0 ){
            await getAllSales(token!);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        handleFetchSales();
    }, [])
    
    if( isLoading ){
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
                <p>Cargando productos</p>
            </div>
        )
    }

    return (
        <section className='pt-8'>
            <Table className="container" aria-label="Sales Table">
                <TableHeader>
                    <TableColumn>Cliente</TableColumn>
                    <TableColumn>Empleado</TableColumn>
                    <TableColumn>Cantidad Productos</TableColumn>
                    <TableColumn>Total</TableColumn>
                    <TableColumn>Generado</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>

                    {
                        sales.map(sale => (
                            <TableRow key={sale.id}>

                                <TableCell>{sale.client}</TableCell>
                                <TableCell>{sale.user.name}</TableCell>
                                <TableCell>{sale.products.length}</TableCell>
                                <TableCell>{sale.total}$</TableCell>
                                <TableCell>{formatDate(sale.createdAt)}</TableCell>
                                <TableCell>
                                    Acciones
                                    {/* <ProductTableActions product={product} /> */}
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </section>
    )
}
