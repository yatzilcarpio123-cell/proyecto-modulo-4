export const STORAGE_KEYS = {
    USUARIOS: 'usuarios',
    CUENTAS: 'cuentas',
    MOVIMIENTOS: 'movimientos',
    SESION: 'sesion'
};

// clase para centralizar la comunicación con LocalStorage
class StorageService{
    //método para guardad información
    guardar(clave, valor){
        const valorJSON =
        JSON.stringify(valor);
        localStorage.setItem(clave, valorJSON);
    }

    //método para obtener información 
    obtener(clave, valorPorDefecto = null){
        const valor = localStorage.getItem(clave);

        //validamos si si existe información
        if(valor === null){
            return valorPorDefecto;
        }
        try {
            return JSON.parse(valor);
        } catch (error) {
            console.error(`no fue posible leer la clave "${clave}" de LocalStorage`, error);
            return valorPorDefecto;
            
        }
    }

    //método de eliminar
    eliminar(clave){
        localStorage.removeItem(clave);
    }

    //método limpiar el localStorage
    limpiar(){
        localStorage.clear();
    }
}

//creamos instancia de storageService
export const storageService = new StorageService();

