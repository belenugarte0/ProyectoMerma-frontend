import { Button, Input } from "@nextui-org/react"
import { useAuthStore, useSaleStore, useCartStore } from "../../stores";
import { toast } from "sonner";
import { useState } from "react";


export const CheckoutForm = () => {
    
    const { user, token } = useAuthStore();
    const { createNewSale } = useSaleStore();
    const { total, cart, cleanCart } = useCartStore();


    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { client } = e.target as HTMLFormElement


        if( client.value.trim() === '' ){
            toast.warning('Debe agregar un cliente');
            setIsLoading(false);
            return;
        }

        await createNewSale(user!.id, client.value, cart, total, token! );
        
        client.value = "";
        cleanCart();

        setIsLoading(false);
    }


    return (
        <section className="col-span-3">
            <div className="mb-6">
                <h2 className="font-bold text-2xl">Completa la venta</h2>
                <p>Complete los detalles de la venta</p>
            
            </div>


            <form onSubmit={handleSubmit} className="checkout__form">
                <Input
                    size="sm"
                    name="client"
                    label="Nombre del cliente"
                />

                <p className="font-semibold text-xl">Total: { total }</p>

                <p>Esta venta sera generada por: { user?.name }</p>
                <Button 
                    type="submit"
                    className="btn-primary"
                    fullWidth
                    isLoading={ isLoading }
                    isDisabled={isLoading}
                >
                    Confirmar venta
                </Button>
            </form>



        </section>
    )
}
