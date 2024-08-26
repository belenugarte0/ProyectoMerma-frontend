import { useEffect, useState } from "react";

import { useAuthStore, useCategoryStore } from "../../stores";

import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { formatDate } from "../../lib";
import { CategoriesTableActions } from "..";




export const CategoriesTable = () => {


    const [isLoadingTable, setIsLoadingTable] = useState(false)

    const token = useAuthStore(state => state.token);
    const categories = useCategoryStore(state => state.categories);
    const getCategories = useCategoryStore(state => state.getCategories);

    const handleFetchCategories = async () => {
        setIsLoadingTable(true);
        if (categories.length === 0) {
            await getCategories(token!);
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
                <p>Cargando categorias</p>
            </div>
        )
    }

    return (
        <section className='pt-8'>
            <Table className="container" aria-label="Categories Table">
                <TableHeader>
                    <TableColumn>Codigo</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Descripcion</TableColumn>
                    <TableColumn>Creacion</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>

                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>{ formatDate( category.createdAt ) }</TableCell>
                                <TableCell>
                                    <CategoriesTableActions
                                        category={ category }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </section>
    )
}
