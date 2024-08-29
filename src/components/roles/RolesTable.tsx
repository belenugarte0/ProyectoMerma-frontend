import { useEffect, useState } from "react";
import { useAuthStore, useRolStore } from "../../stores";
import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { formatDate } from "../../lib";
import { RolesTableActions } from "..";

export const RolesTable = () => {
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const token = useAuthStore(state => state.token);
    const roles = useRolStore(state => state.roles);
    const getRoles = useRolStore(state => state.getRoles);

    const handleFetchRoles = async () => {
        setIsLoadingTable(true);
        if (roles.length === 0) {
            await getRoles(token!);
        }
        setIsLoadingTable(false);
    }

    useEffect(() => {
        handleFetchRoles();
    }, []);

    if (isLoadingTable) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <CircularProgress />
                <p>Cargando roles</p>
            </div>
        );
    }

    return (
        <section className="pt-8">
            <Table className="container" aria-label="Roles Table">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Creacion</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {roles.map(rol => (
                        <TableRow key={rol.id}>
                            <TableCell>{rol.id}</TableCell>
                            <TableCell>{rol.name}</TableCell>
                            <TableCell>{rol.status}</TableCell>
                            <TableCell>{ formatDate( rol.createdAt ) }</TableCell>
                            <TableCell>
                                <RolesTableActions rol={rol} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
