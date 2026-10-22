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


/* ========================================= 
	PUNTO DE ENTRADA DE LA APLICACIÓN 
========================================= */

// Mostramos la versión actual del proyecto
console.log('Sistema de Gestión Bancaria - v0.2.0');

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
const bancoDemo = new Banco;

/* ========================================== 
			USUARIO 
========================================== */ 
const usuarioDemo = new Usuario({
    nombre: 'Yatzil Carpio',
    email: 'yatzil@correo.com',
    telefono: '5580970111',
    password: '123456',
});
bancoDemo.agregarUsuario(usuarioDemo);
console.log('Usuarios registrados:', bancoDemo.usuarios);

console.log(
    'Usuario: ',
    usuarioDemo,
);

/* ========================================== 
				CUENTA
Creamos una cuenta y la asociamos al usuario utilizando su ID
========================================== */
const cuentaDemo = new Cuenta({
    numeroCuenta: '123456789012',
    usuarioId: usuarioDemo.id,
});

console.log(
    'Cuenta: ',
    cuentaDemo,
);

bancoDemo.agregarCuenta(cuentaDemo);

//DEPOSITO
const depositoDemo = bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: 1000,
    descripcion: 'Desposito inicial'
});

//mostramos el saldio
console.log('Saldo actual:', formatCurrency(cuentaDemo.saldo));

//mostramos el movimiento generado
console.log('Movimiento generado:', depositoDemo);

//mostramos el historial general
console.log(
    'Movimientos registrados: ',
    bancoDemo.movimientos,
);

/* BUSQUEDAS */
const usuarioEncontrado = bancoDemo.buscarUsuarioPorId(usuarioDemo.id);
console.log('Usuario encontrado:', usuarioEncontrado); 
console.log(usuarioEncontrado === usuarioDemo);

const cuentasUsuario = bancoDemo.obtenerCuentasdeUsuario(usuarioDemo.id);
console.log('Cuentas del usuario: ', cuentasUsuario);

/* RELACIONES */
console.log('La cuenta pertenece al usuario:', usuarioDemo.id === cuentaDemo.usuarioId);
console.log ('El deposito pertenece a la cuenta:', cuentaDemo.id === depositoDemo.id === depositoDemo.cuentaOrigen);

/* REGLA NEGATIVA */
try {
    bancoDemo.realizarDeposito({
        cuentaId: cuentaDemo.depositar,
        monto: -100,
    });
} catch (error) {
    console.log(
        'Error',
        error.message);
    
}

/* ========================================== 
				MOVIMIENTO
Representamos manualmente el depósito mediante una instancia
de movimiento
========================================== */
const movimientoDemo = new Movimiento({
    tipo: 'DEPOSITO',
    monto: 1000,
    descripcion: 'Depósito inicial',
    cuentaOrigen: cuentaDemo.id,
    saldoResultante: cuentaDemo.saldo,
});

//mostramsos el movimeinto creado
console.log (
    'Movimiento: ',
    movimientoDemo,
);

