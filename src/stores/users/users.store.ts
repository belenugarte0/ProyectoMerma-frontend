import { StateCreator, create } from "zustand";
import { IUsersResponse, ISimpleUser, IUpdateUserResponse } from "../../interface";
import { inventoryDb } from "../../api";
import { toast } from "sonner";
import { isAxiosError } from "axios";


interface UserState {
    users: ISimpleUser[];
}


interface Actions {
    getUsers: ( token: string ) => Promise<void>;
    deleteUser: (id: string | number, token: string) => Promise<void>;
    createUser: (name: string, lastname: string, document: string, email: string, phone: string,  token: string) => Promise<void>;
    updateUser: ( id:string | number, name: string, lastname: string, document: string, email: string, phone: string, token: string ) => Promise<void>;
}


const storeApi: StateCreator<UserState & Actions> = (set, get) => ({

    users: [],

    getUsers: async (token) => {
        
        const { data } = await inventoryDb.get<IUsersResponse>('/users',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        set( () => ({
            users: data.users
        }))
        console.log(data.users);
        
    },

    updateUser: async (id, name, lastname, document, email, phone, token) => {
        const getUsers = get().getUsers;
        
        try {
            const { data } = await inventoryDb.put<IUpdateUserResponse>(`/users/${id}`,{ name, lastname, document, email, phone}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);

            await getUsers(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }

        }
    },

    deleteUser: async ( id, token ) => {
        const getUsers = get().getUsers;
        try {
            const { data } = await inventoryDb.delete(`/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);
            await getUsers(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }
        }
    },

    createUser: async ( name, lastname, document, email, phone, token ) => {
        const getUsers = get().getUsers;


        try {
            const { data } = await inventoryDb.post<{ message: string }>('/users', {
                name, lastname, document, email, phone
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })


            toast.success('Guardado con exito',{ description: data.message });
            await getUsers(token);
            
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



export const useUserStore = create<UserState & Actions>()(
    storeApi,
)