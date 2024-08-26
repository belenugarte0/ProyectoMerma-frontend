import { StateCreator, create } from 'zustand';
import { ICartProduct, IProduct } from '../../interface';
import { toast } from 'sonner';
import { persist } from 'zustand/middleware';

interface CartState {
    cart: ICartProduct[];
    total: number;
}


interface Actions {
    calcTotal: () => void;
    cleanCart: () => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    removeProductToCart: (id: number) => void;
    addProductToCart: (product: IProduct) => void
}

const storeApi: StateCreator<CartState & Actions> = (set, get) => ({
    cart: [],
    total: 0,

    calcTotal: () => {
        const { cart } = get();

        let subTotal = 0;

        cart.forEach(item => {
            subTotal += +item.price * item.quantity
        })

        set({ total: subTotal });
        
    },

    addProductToCart: (product: IProduct) => {
        const { cart, calcTotal, incrementQuantity } = get();

        const productInCart = cart.some(item => item.id === product.id);

        if (!productInCart) {
            set({
                cart: [
                    ...cart,
                    {
                        id: product.id,
                        name: product.name,
                        quantity: 1,
                        price: product.price,
                        image: product.image,
                        slug: product.slug
                    }
                ]
            });

            calcTotal();
            toast.success(`${ product.name } se agrego al carrito`);
            return;
        }

        incrementQuantity( product.id )


    },

    incrementQuantity: (id: number) => {
        const { cart, calcTotal } = get();

        const updatedCartProducts = cart.map(item => {
            if (item.id === id){
                return {...item, quantity: item.quantity + 1}
            }

            return item;
        })

        set({ cart: updatedCartProducts });
        calcTotal();

    },

    decrementQuantity: (id: number) => {
        const { cart, calcTotal } = get();
        
        const updatedCartProducts = cart.map(item => {
            if( item.quantity === 1 ){
                return item;
            }

            if( item.id === id ){
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })

        set({
            cart: updatedCartProducts
        })
        calcTotal()

    },

    removeProductToCart: (id: number) => {
        const { cart, calcTotal } = get();

        const updatedCartProducts = cart.filter(item => item.id != id);

        set({ cart: updatedCartProducts });
        calcTotal();

    },

    cleanCart: () => {
        set({ cart: [], total: 0 });
    }

})


export const useCartStore = create<CartState & Actions>()(
    persist(
        storeApi,
        { name: 'cart-storage' }
    )
);