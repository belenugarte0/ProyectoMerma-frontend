import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useAuthStore, useCategoryStore, useProductStore } from '../../stores';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


export const NewProductForm = () => {
    
    const navigate = useNavigate();
    
    const [image, setImage] = useState<File>();
    const [preImage, setPreImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const token = useAuthStore(state => state.token);
    const categories = useCategoryStore(state => state.categories);
    const getCategories = useCategoryStore(state => state.getCategories);
    const createProduct = useProductStore(state => state.createProduct)


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImage(file);

        const preview = URL.createObjectURL(file);
        setPreImage(preview)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const { productName, description, stock, price, category_id } = e.target as HTMLFormElement;

        const product = {
            name: productName.value,
            description: description.value,
            stock: stock.value,
            price: price.value,
            category_id: category_id.value
        }


        if( Object.values(product).includes('') ){

            toast.error('Datos incorrectos', {
                description: 'Todos los campos son requeridos'
            })

            setIsLoading(false);

            return;
        }

        if( !image ){
            toast.error('Datos incorrectos', {
                description: 'Debe agregar una imagen'
            })

            setIsLoading(false);

            return;
        }         


        // TODO: CREATE PRODUCT ACTION
        await createProduct(product, image, token!)

        setIsLoading(false);
        navigate('/admin/products')

    }

    useEffect(() => {
        if( categories.length === 0 ) getCategories(token!);
    }, [])
    


    return (
        <section className='pt-8'>
            <form onSubmit={handleSubmit} className='container grid grid-cols-2'>

                <div className="space-y-4 w-full">
                    <Input
                        size='sm'
                        label="Nombre"
                        placeholder='Nombre del producto'
                        name='productName'
                    />

                    <Textarea
                        name='description'
                        label="Descripcion"
                        placeholder='Agrega una descripcion para el producto'
                    ></Textarea>

                    <Input
                        size='sm'
                        type="number"
                        min={0}
                        step='0.01'
                        name='price'
                        label="Precio"
                        placeholder='Precio del producto para venta'
                    />

                    <Input
                        type="number"
                        name='stock'
                        min='0'
                        size='sm'
                        label="Stock disponible"
                        placeholder='Stock disponible del producto'
                    />


                    <Select
                        name='category_id'
                        label="Categorias"
                        placeholder='Selecciona una categoria'
                    >
                        {
                            categories.map(category => (
                                <SelectItem key={ category.id }  value={ category.id }>
                                    { category.name }
                                </SelectItem>
                            ))
                            
                        }
                    </Select>

                    <input 
                        onChange={ handleImage }
                        type="file"
                    />

                    <Button
                        isLoading={ isLoading }
                        isDisabled={ isLoading }
                        type='submit'
                        className='btn-primary'
                        fullWidth
                    >Guardar producto</Button>

                </div>


                <div className='w-full'>
                    <img src={ preImage } className='max-w-[400px] mx-auto' />
                </div>

            </form>


        </section>
    )
}
