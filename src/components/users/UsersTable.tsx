import { useEffect, useState } from "react";

import { useAuthStore, useUserStore } from "../../stores";

import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { formatDate } from "../../lib";
import { UsersTableActions } from "..";




export const UsersTable = () => {


    const [isLoadingTable, setIsLoadingTable] = useState(false)

    const token = useAuthStore(state => state.token);
    const users = useUserStore(state => state.users);
    const getUsers = useUserStore(state => state.getUsers);

    const handleFetchUsers = async () => {
        setIsLoadingTable(true);
        if (users.length === 0) {
            await getUsers(token!);
        }
        setIsLoadingTable(false);
    }

    useEffect(() => {
        handleFetchUsers();
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
            <Table className="container" aria-label="Users Table">
                <TableHeader>
                    <TableColumn>Codigo</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Apellido</TableColumn>
                    <TableColumn>Documento</TableColumn>
                    <TableColumn>Correo</TableColumn>
                    <TableColumn>Telefono</TableColumn>
                    <TableColumn>Creacion</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>

                    {
                        users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.document}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{ formatDate( user.createdAt ) }</TableCell>
                                <TableCell>
                                    <UsersTableActions
                                        user={ user }
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
