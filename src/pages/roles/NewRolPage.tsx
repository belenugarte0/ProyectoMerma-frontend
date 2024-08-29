
import { HeaderPage, NewRolForm } from '../../components'

export const NewRolPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/roles'
                btnTitle='Regresar'
                description='Crea una categoria en el sistema'
                title='Nueva categoria'
            />
            <NewRolForm/>

        </>
    )
}
