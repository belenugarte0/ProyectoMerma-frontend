import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { useAuthStore, useRolStore } from '../../stores';
import { Button, Input, Checkbox } from '@nextui-org/react';
import axios from 'axios';

export const NewRolForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const navigate = useNavigate();

    const token = useAuthStore(state => state.token);
    const createRol = useRolStore(state => state.createRol);

    // Obtener permisos desde el backend
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get('/api/permissions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Verifica el formato de los datos recibidos
                console.log('Permisos recibidos:', response.data);

                if (Array.isArray(response.data)) {
                    setPermissions(response.data);
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } catch (error) {
                console.error('Error al cargar los permisos:', error);
                toast.error('Error al cargar los permisos');
            }
        };

        fetchPermissions();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        const rolName = formData.get('rolName');
        const selectedPermissions = formData.getAll('selectedPermissions');

        if (rolName.trim() === '') {
            setIsLoading(false);
            toast.error('Error al guardar', {
                description: 'Todos los campos son requeridos'
            });
            return;
        }

        try {
            await createRol(rolName, token, selectedPermissions);
            navigate('/admin/Roles');
        } catch (error) {
            toast.error('Error al guardar el rol');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="pt-8">
            <form onSubmit={handleSubmit} className="container space-y-4">
                <Input
                    label="Nombre"
                    placeholder="Ingrese un nombre para el rol"
                    name="rolName"
                />

                <div className="permissions-container">
                    {Array.isArray(permissions) && permissions.map(group => (
                        <div key={group.grupo}>
                            <h3>{group.grupo}</h3>
                            {group.permissions.map(permission => (
                                <Checkbox
                                    key={permission.id}
                                    value={permission.id}
                                    name="selectedPermissions"
                                >
                                    {permission.name}
                                </Checkbox>
                            ))}
                        </div>
                    ))}
                </div>

                <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    type="submit"
                    className="btn-primary"
                >
                    Guardar
                </Button>
            </form>
        </section>
    );
};
