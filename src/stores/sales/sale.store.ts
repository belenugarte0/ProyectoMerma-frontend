import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { StateCreator, create } from 'zustand';


import { inventoryDb } from '../../api';
import { ICartProduct, ISale, ISalesResponse } from '../../interface';

interface SaleState {
    sales: ISale[]
}


interface Actions {
    getAllSales: (token: string) => Promise<void>
    createNewSale: (userId: number, client: string, cart: ICartProduct[], total: number, token: string) => Promise<void>
}

const storeApi: StateCreator<SaleState & Actions> = (set, get) => ({

    sales: [],

    getAllSales: async (token: string) => {
        try {
            const { data } = await inventoryDb.get<ISalesResponse>('/sales', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            set({ sales: data.sales });


        } catch (error) {
            console.log(error);
            if( isAxiosError(error) ){
                toast.error(error.response?.data.message);
            }
        }
    },


    createNewSale: async (userId: number, client: string, cart:ICartProduct[], total: number, token: string) => {
        const { getAllSales } = get();

        const products = cart.map(item => {
            return {
                product_id: item.id,
                product_name : item.name,
                product_slug : item.slug,
                product_price : item.price,
                quantity: item.quantity
            }
        })

        const sale = {
            user_id: userId,
            client,
            products,
            total
        }

        try {
            const { data } = await inventoryDb.post('/sales', sale, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            toast.success(data.message);
            await getAllSales( token )

        } catch (error) {
            console.log(error);
            if( isAxiosError(error) ){
                toast.error(error.response?.data.message);
            }
        }


    }
})


export const useSaleStore = create<SaleState & Actions>()(
    storeApi
);