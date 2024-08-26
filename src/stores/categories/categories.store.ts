import { StateCreator, create } from "zustand";
import { ICategoriesResponse, ISimpleCategory, IUpdateCategoryResponse } from "../../interface";
import { inventoryDb } from "../../api";
import { toast } from "sonner";
import { isAxiosError } from "axios";


interface CategoryState {
    categories: ISimpleCategory[];
}


interface Actions {
    getCategories: ( token: string ) => Promise<void>;
    deleteCategory: (id: string | number, token: string) => Promise<void>;
    createCategory: (name: string, description: string, token: string) => Promise<void>;
    updateCategory: ( id:string | number, name: string, description: string, token: string ) => Promise<void>;
}


const storeApi: StateCreator<CategoryState & Actions> = (set, get) => ({

    categories: [],

    getCategories: async (token) => {
        
        const { data } = await inventoryDb.get<ICategoriesResponse>('/categories',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        set( () => ({
            categories: data.categories
        }))
    },

    updateCategory: async (id, name, description, token) => {
        const getCategories = get().getCategories;
        
        try {
            const { data } = await inventoryDb.put<IUpdateCategoryResponse>(`/categories/${id}`,{ name, description }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);

            await getCategories(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }

        }
    },

    deleteCategory: async ( id, token ) => {
        const getCategories = get().getCategories;
        try {
            const { data } = await inventoryDb.delete(`/categories/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            toast.success(data.message);
            await getCategories(token);

        } catch (error) {
            console.log(error);

            if( isAxiosError(error) ){
                toast.error('Ocurrio un error', {
                    description: error.response?.data.message
                })
            }
        }
    },

    createCategory: async ( name, description, token ) => {
        const getCategories = get().getCategories;


        try {
            const { data } = await inventoryDb.post<{ message: string }>('/categories', {
                name,
                description
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })


            toast.success('Guardado con exito',{ description: data.message });
            await getCategories(token);
            
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



export const useCategoryStore = create<CategoryState & Actions>()(
    storeApi,
)