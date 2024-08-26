import { Button } from "@nextui-org/react";
import { useAuthStore } from "../../stores";
import { Link, useLocation } from "react-router-dom";

import Logo from '../../assets/logo.svg'
import { sideMenuOptions } from "../../lib";


export const SideMenu = () => {

    const { pathname } = useLocation();

    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);


    return (
        <aside className="sidemenu">

            {/* LOGO */}
            <div className="sidemenu__logo">
                <img src={Logo} alt="Gesty" className="max-w-[50px]" />

                <div className="leading-[.5]">
                    <h1 className="font-bold text-xl">Gesty</h1>
                    <p className="text-sm font-light">Gestiona tu inventario</p>
                </div>

            </div>




            {/* SIDE MENU OPTIONS */}
            <ul className="space-y-4">
                {
                    sideMenuOptions.map( option => (
                        <li key={ option.path }>
                            <Link
                                to={{ pathname: option.path }}
                                className={`sidemenu__link ${ pathname.includes( option.path ) && 'sidemenu__link--active'  }`}
                            >
                                <span>{ option.icon }</span>
                                { option.name }
                            </Link>
                        </li>
                    ))
                }
            </ul>





            <div className="flex-1"/>




            {/* PROFILE INFO */}
            <div className="sidemenu__avatar">

                <img 
                    className="mx-auto max-w-14 mb-4"
                    src="https://lh3.googleusercontent.com/a/ACg8ocK2GAvSNuwN-zRMJkMVv8UPMuwaDZVyBGHyPR-pU4ei1S4=s96-c-rg-br100" alt={user?.name} />

                <h3>{ user!.name }</h3>
                <p className="text-sm">{ user!.email }</p>

                <Button 
                    onClick={logout}
                    className="mt-4"
                    variant="light"  
                    fullWidth
                    color="danger"
                >
                
                    Cerrar Sesion
                </Button>


            </div>

        </aside>
    )
}
