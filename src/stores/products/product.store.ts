import { StateCreator, create } from 'zustand';
import { toast } from 'sonner';


import { inventoryDb } from '../../api';
import { ICreateProductResponse, IProduct, IProductsResponse } from '../../interface';
import { isAxiosError } from 'axios';

interface ProductState {
    products: IProduct[];
}


interface Actions {
    createProduct: ( 
        product: { name: string, description: string, price: string, stock: string, category_id: string }, 
        image: File,
        token: string
    ) => Promise<void>;

    getProducts: ( token: string ) => Promise<void>;
    deleteProduct: (id: string | number, token: string) => Promise<void>;


}

const storeApi: StateCreator<ProductState & Actions> = (set, get) => ({

    products: [],

    getProducts: async (token: string) => {
        const { data } = await inventoryDb.get<IProductsResponse>('/products', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        set(() => ({
            products: data.products
        }))


    },  

    createProduct: async ( product, image, token ) => {
        const getProducts = get().getProducts;

        const formData = new FormData();
        formData.append('image', image);

        try {
            
            const { data: imageUrl } = await inventoryDb.post<string>('/upload/image', formData);

            if( !imageUrl ){
                toast.error('No se proceso la imagen')
                return;
            }

            const { data } = await inventoryDb.post<ICreateProductResponse>('/products', {
                ...product,
                image: imageUrl
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);
            await getProducts(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }

        }
    },

    deleteProduct: async (id: string | number, token: string) => {
        const getProducts = get().getProducts;

        try {
            const { data } = await inventoryDb.delete(`/products/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            toast.success(data.message);
            getProducts(token);

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


export const useProductStore = create<ProductState & Actions>()(
    storeApi
);