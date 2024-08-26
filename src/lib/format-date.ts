export const formatDate = ( fecha: string ) => {

    const nuevaFecha = new Date( fecha );

    const dia = nuevaFecha.getDate();
    const mes = nuevaFecha.getMonth() + 1;
    const año = nuevaFecha.getFullYear();


    const fechaFormateada = `${  dia < 10 ? '0' + dia : dia } - ${  mes < 10 ? '0' + mes : mes } - ${ año }`
    
    return fechaFormateada;
}