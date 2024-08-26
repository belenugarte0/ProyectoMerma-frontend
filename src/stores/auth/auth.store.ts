import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

import { toast } from "sonner";
import { isAxiosError } from "axios";

import { inventoryDb } from "../../api";
import { ILoginResponse, IUser } from "../../interface";


// GUARDA EL ESTADO1
interface AuthState {
    user: undefined | IUser,
    token: undefined | string,
    authStatus: 'pending' | 'auth' | 'not-auth'
}



// GUARDA LAS FUNCIONES QUE MODIFICA EL ESTADO
interface Actions {
    logout: () => Promise<void>
    checkAuthStatus: () => Promise<void>;
    login: ( email: string, password: string) => Promise<void>;
}



const storeApi: StateCreator<AuthState & Actions> = (set, get) => ({
    user: undefined,
    token: undefined,
    authStatus: 'pending',

    login : async ( email: string, password: string ) => {

        try {
            const { data } = await inventoryDb.post<ILoginResponse>('/auth/login', { email, password });
            
            // CAMBIAR ESTADO
            set(() => ({
                user: data.user,
                token: data.token,
                authStatus: 'auth',
            }))

            // MOSTRAR MODAL CON USUARIO
            toast.success('Session iniciada', {
                description: 'Bienvenido ' + data.user.name
            });
        } catch (error) {
            // VALIDAR ERROR
            set( () => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }))

            console.log(error)
            
            if( isAxiosError( error ) ){
                // MOSTRAR TOAST CON ERROR
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                });
            }
        }
    },

    checkAuthStatus: async () => {

        const token = get().token;

        if( !token ){
            set( () => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }))
            return;
        }
        

        try {
            const { data } = await inventoryDb.get<{ user: IUser }>('/auth/checkToken', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            set(() => ({
                user: data.user,
                token: token,
                authStatus: 'auth'
            }))

            console.log(get().user)

        } catch (error) {
            console.log(error)
            set( () => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }))
            return;
        }
    },

    logout: async () => {
        const token = get().token;

        try {
            await inventoryDb.post('/auth/logout', {}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            set( () => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }))
            
        } catch (error) {
            console.log(error)
            
            if( isAxiosError( error ) ){
                // MOSTRAR TOAST CON ERROR
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                });
            }
        }

    }    

})


export const useAuthStore = create<AuthState & Actions>()(
    persist(
        storeApi,
        {
            name: "auth-store",
        }
    )

)