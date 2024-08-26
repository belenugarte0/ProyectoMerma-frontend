import { LuPen } from 'react-icons/lu';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input } from '@nextui-org/react';
import { useAuthStore, useUserStore } from '../../stores';
import { useState } from 'react';
import { ISimpleUser } from '../../interface';


interface Props {
    user: ISimpleUser;
}

export const EditUserModal = ({ user }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const token = useAuthStore( state => state.token );
    const updateUser = useUserStore(state => state.updateUser)

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading( true );
        const { userName, userLastname, userDocument, userEmail, userPhone} = e.target as HTMLFormElement;
        
        await updateUser( user.id, userName.value, userLastname.value, userDocument.value, userEmail.value, userPhone.value, token!)
        
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
                            <ModalHeader className="flex flex-col gap-1">Editar Usuario</ModalHeader>
                            <ModalBody>

                                <Input
                                    name='userName' 
                                    label="Nombre"
                                    placeholder='Modifica el nombre del Usuario'
                                    defaultValue={ user.name }
                                />

                                <Input
                                    name='userLastname'
                                    label="Apellido"
                                    placeholder='Modifica el Apellido del Usuario'
                                    defaultValue={ user.lastname }
                                />
                                
                                <Input
                                    name='userDocument'
                                    label="Documento"
                                    placeholder='Modifica el Documento del Usuario'
                                    defaultValue={ user.document }
                                />

                                <Input
                                    name='userEmail'
                                    label="Correo"
                                    placeholder='Modifica el Correo del Usuario'
                                    defaultValue={ user.email }
                                />

                                <Input
                                    name='userPhone'
                                    label="Telefono"
                                    placeholder='Modifica el Telefono del Usuario'
                                    defaultValue={ user.phone }
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
