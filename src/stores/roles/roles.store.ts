import { StateCreator, create } from "zustand";
import { IRolesResponse, ISimpleRol, IUpdateRolResponse } from "../../interface";
import { inventoryDb } from "../../api";
import { toast } from "sonner";
import { isAxiosError } from "axios";


interface RolState {
    roles: ISimpleRol[];
}


interface Actions {
    getRoles: ( token: string ) => Promise<void>;
    deleteRol: (id: string | number, token: string) => Promise<void>;
    createRol: (name: string, token: string) => Promise<void>;
    updateRol: ( id:string | number, name: string, token: string ) => Promise<void>;
}


const storeApi: StateCreator<RolState & Actions> = (set, get) => ({

    roles: [],

    getRoles: async (token) => {
        
        const { data } = await inventoryDb.get<IRolesResponse>('/roles',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        set( () => ({
            roles: data.roles
        }))
    },

    updateRol: async (id, name, token) => {
        const getRoles = get().getRoles;
        
        try {
            const { data } = await inventoryDb.put<IUpdateRolResponse>(`/roles/${id}`,{ name }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);

            await getRoles(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }

        }
    },

    deleteRol: async ( id, token ) => {
        const getRoles = get().getRoles;
        try {
            const { data } = await inventoryDb.delete(`/roles/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);
            await getRoles(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }
        }
    },

    createRol: async ( name, token ) => {
        const getRoles = get().getRoles;


        try {
            const { data } = await inventoryDb.post<{ message: string }>('/roles', {
                name,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })


            toast.success('Guardado con exito',{ description: data.message });
            await getRoles(token);
            
        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }
        }
    }



})



export const useRolStore = create<RolState & Actions>()(
    storeApi,
)