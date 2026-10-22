/* ========================================= 
IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
========================================= */
// Importamos las funciones encargadas de validar información.
import {
    validarCampoObligatorio,
    validarMonto,
} from './utils/validators.js';

// Importamos nuestra función auxiliar encargada de generar identificadores.
import {
    generarId,
} from './utils/helpers.js';

// Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {
    formatCurrency,
    formatDate,
    formatAccountNumber,
} from './utils/formatters.js';

/* ========================================= 
		IMPORTAR MODELO USUARIO
		IMPORTAR MODELO CUENTA
		IMPORTAR MODELO MOVIMIENTO
========================================= */
import { Usuario } from './models/Usuario.js';
import { Cuenta } from './models/Cuenta.js';
import { Movimiento } from './models/Movimiento.js';

import { Banco } from './models/Banco.js';

import { STORAGE_KEYS, storageService } from './services/StorageService.js';

// Mostramos la versión actual del proyecto
console.log('Sistema de Gestión Bancaria - v0.5.0');

/* FUNCIONES DE PERSISTENCIA EN LOCALSTORAGE */
// funcion para guardar el estado del banco
function guardarBanco(banco){
    //guardamos usuarios
    storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);

    //guardamos cuentas
    storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);

    //guardamos movimientos
    storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);
}

//función para cargar los datos del banco 
function cargarBanco(){
    //datos de usuario
    const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

    //datos de cuentas
    const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);

    //datos de movimientos
    const movimientosGuardados = storageService.obtener(STORAGE_KEYS.MOVIMIENTOS, []);

    //reconstruimos usuarios
    const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));

    //reconstruir cuentas
    const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta (cuenta));

    //reconstruir movimientos 
    const movimientos = movimientosGuardados.map((movimiento) => new Movimiento(movimiento));

    return new Banco({
        usuarios,
        cuentas,
        movimientos
    });


}


/* RECONSTRUIMOS LAS INSTANCIAS PARA RESUPERAR USUARIO Y SUS METODOS */
// Validación de campo debe mostrar true
console.log(
    'Campo obligatorio:',
    validarCampoObligatorio('Banco Digital'),
);

// Probar validación del monto debe regresar True
console.log(
    'Monto válido:',
    validarMonto(1000),
);

// Generamos un identificador dinámico
console.log(
    'ID generado:',
    generarId(),
);

// Convertimos 1500 a formato monetario MXN
console.log(
    'Monto formateado:',
    formatCurrency(1500),
);

// Formateamos la fecha actual
console.log(
    'Fecha formateada:',
    formatDate(new Date()),
);

// Separamos visualmente cada cuatro dígitos
console.log(
    'Número de cuenta:',
    formatAccountNumber('123456789012'),
);

/* BANCO */
const bancoDemo = cargarBanco();

//validamos si el banco está vacío
if(bancoDemo.usuarios.length === 0){
    //creamos usuario inicial
    const usuarioDemo =
        new Usuario({
            nombre: 'Yatzil Carpio',
            email: 'yatzil@correo.com',
            telefono: '5580970111',
            password: '123456'
        });
    
    bancoDemo.agregarUsuario(usuarioDemo)

    //creamos la cuenta inicial 
    const cuentaDemo = new Cuenta ({
        numeroCuenta: '123456789',
        usuarioId: usuarioDemo.id
    });

    //registramos cuenta
    bancoDemo.agregarCuenta(cuentaDemo);

    //realizamos depósito inicial
    bancoDemo.realizarDeposito({
        cuentaId: cuentaDemo.id,
        monto: 1000,
        descripcion: 'Deposito inicial'
    });

    //guardamos el banco
    guardarBanco(bancoDemo);

    console.log ('Datos iniciales creados y guardados');
}

//COMPROBAMOS LOS DATOS RECUPERADOS
console.log('Banco recuperado:', bancoDemo);

//mostramos los usuarios
console.log('Usuarios almacenados:', bancoDemo.usuarios);

//mostramos las cuentas
console.log('Cuentas almacenadas:', bancoDemo.cuentas);

//mostrar movimientos
console.log('Movimientos almacenados', bancoDemo.movimientos);

/* ========================================= 
		OBTENER PRIMERA CUENTA 
========================================= */
const cuentaPrincipal =
    bancoDemo.cuentas[0] || null;

//mostrar saldo 
if (cuentaPrincipal) {
    console.log(
        'Saldo persistido:',
        // /* Convertimos el saldo a formato monetario antes de mostrarlo. */
        formatCurrency(
            cuentaPrincipal.saldo,
        ),
    );
    console.log(
        '¿La cuenta recuperada sigue siendo una instancia de Cuenta?',
        cuentaPrincipal
            instanceof Cuenta,
    );
    console.log(
        'Tipo de depositar:',
        typeof cuentaPrincipal.depositar,
    );

}
