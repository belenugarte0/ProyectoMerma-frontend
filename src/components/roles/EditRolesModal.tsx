

import { LuPen } from 'react-icons/lu';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input } from '@nextui-org/react';
import { useAuthStore, useRolStore } from '../../stores';
import { useState } from 'react';
import { ISimpleRol } from '../../interface';


interface Props {
    rol: ISimpleRol;
}

export const EditRolModal = ({ rol }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore( state => state.token );
    const updateRol = useRolStore(state => state.updateRol)

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading( true );
        const { rolName } = e.target as HTMLFormElement;
        
        await updateRol( rol.id, rolName.value, token!)
        
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
                                    name='rolName' 
                                    label="Nombre"
                                    placeholder='Modifica el nombre de la categoria'
                                    defaultValue={ rol.name }
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
