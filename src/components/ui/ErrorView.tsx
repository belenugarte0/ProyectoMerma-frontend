import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom"

export const ErrorView = () => {

    const navigate = useNavigate();

    return (
        <section className='min-h-screen flex flex-col items-center justify-center'>
            <h1 className='font-light text-[4rem] mb-1'>404</h1>
            <p>No se encontro esta pagina</p>

            <Button
            

            className="btn-primary" onClick={() => navigate(-1)}>
                Volver atras
            </Button>
        </section>
    )
}
