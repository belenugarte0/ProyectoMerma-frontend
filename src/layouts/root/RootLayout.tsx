import { Toaster } from 'sonner';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../../stores';
import { SideMenu } from '../../components';
import { CircularProgress } from '@nextui-org/react';

export const RootLayout = () => {
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

    if( authStatus === 'not-auth' ){
        return <Navigate  to='/auth/login' />
    }

    return (
        <div className='dashboard'>
            <Toaster
                position='top-right'
                richColors
                closeButton
                style={{ position:'absolute' }}
            />

            <SideMenu/>

            <div className='w-full'>
                <Outlet/>
            </div>
        
        
        </div>
    )
}
