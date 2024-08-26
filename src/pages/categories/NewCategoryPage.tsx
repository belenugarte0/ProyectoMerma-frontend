
import { HeaderPage, NewCategoryForm } from '../../components'

export const NewCategoryPage = () => {
    return (
        <>
            <HeaderPage
                btnPath='/admin/categories'
                btnTitle='Regresar'
                description='Crea una categoria en el sistema'
                title='Nueva categoria'
            />
            <NewCategoryForm/>

        </>
    )
}
