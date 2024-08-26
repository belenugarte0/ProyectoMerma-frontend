import { LuAreaChart, LuClipboardList, LuLayers, LuShoppingCart, LuUser } from "react-icons/lu";


export const sideMenuOptions = [
    {
        path: 'products',
        name: "Productos",
        icon: <LuClipboardList/>
    },

    {
        path: 'categories',
        name: "Categorias",
        icon: <LuLayers/>
    },

    {
        path: 'users',
        name: "Usuarios",
        icon: <LuUser/>
    },

    {
        path: 'cart',
        name: "Carrito",
        icon: <LuShoppingCart/>
    },

    {
        path: 'sales',
        name: "Ventas",
        icon: <LuAreaChart/>
    },

]