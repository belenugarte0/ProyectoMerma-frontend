import Logo from '../../assets/logo.svg'

import { Toaster } from 'sonner'
import { Navigate, Outlet } from "react-router-dom"

import { useAuthStore } from "../../stores"
import { CircularProgress } from "@nextui-org/react"


export const AuthLayout = () => {

    const authStatus = useAuthStore(state => state.authStatus);
    const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

    if( authStatus === 'pending' ){

        checkAuthStatus();

        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p>Cargando...</p>
                <CircularProgress/>
            </div>
        )
    }

    if( authStatus === 'auth' ){
        return <Navigate  to='/admin/categories' />
    }


    return (
        <>
            <Toaster
                position="top-center"
                richColors
                closeButton
                style={{
                    position: "absolute",
                }}
            />

            <section className="auth__layout">
                <div className="flex items-center mb-4">
                    <img
                        src={ Logo } 
                        alt="Gesty"
                        className="max-w-[70px]" 
                    />

                    <div className="leading-[.5]">
                        <h1 className="text-2xl font-bold">Gesty</h1>
                        <p>Gestiona tu inventario</p>
                    </div>
                </div>

                <Outlet/>
        
            </section>
        
        </>
    )
}
