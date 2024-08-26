

import { LuPen } from 'react-icons/lu';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input } from '@nextui-org/react';
import { useAuthStore, useCategoryStore } from '../../stores';
import { useState } from 'react';
import { ISimpleCategory } from '../../interface';


interface Props {
    category: ISimpleCategory;
}

export const EditCategoryModal = ({ category }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore( state => state.token );
    const updateCategory = useCategoryStore(state => state.updateCategory)

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading( true );
        const { categoryName, description } = e.target as HTMLFormElement;
        
        await updateCategory( category.id, categoryName.value, description.value, token!)
        
        setIsLoading( false );
        onClose();
    }

    return (
        <>
            <Button
                onClick={onOpen}
                isIconOnly
                color='primary'
                variant='light'
                startContent={ <LuPen size={18} /> }
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={ handleSubmit }>
                            <ModalHeader className="flex flex-col gap-1">Editar categoria</ModalHeader>
                            <ModalBody>
                                <Input
                                    name='categoryName' 
                                    label="Nombre"
                                    placeholder='Modifica el nombre de la categoria'
                                    defaultValue={ category.name }
                                />

                                <Input
                                    name='description'
                                    label="Descripcion"
                                    placeholder='Modifica la descripcion de la categoria'
                                    defaultValue={ category.description }
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button isLoading={ isLoading } isDisabled={ isLoading } color="primary" type='submit'>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );



}
