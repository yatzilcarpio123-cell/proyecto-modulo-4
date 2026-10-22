/* ========================================= 
		IMPORTAR MODELO MOVIMIENTO
Banco necesitará crear movimientos automáticamente cuando se realicen operaciones como depósitos. 
========================================= */
import { Movimiento } from './Movimiento.js';


/* ========================================= 
			MODELO BANCO
Banco será el encargado de coordinar usuarios, cuentas y movimientos.
========================================= */
export class Banco {
    constructor({
        usuarios = [],
        cuentas = [],
        movimientos = [],
    } = {}) {
        this.usuarios = usuarios;
        this.cuentas = cuentas;
        this.movimientos = movimientos;
    }

    /* ========================================= 
		AGREGAR USUARIO
Registra un usuario dentro del banco siempre que no exista otro usuario con el mismo ID.
========================================= */
agregarUsuario(usuario) {

	// some() comprueba si al menos un elemento del array cumple con la condición indicada.
    const existe = this.usuarios.some(
        (u) => u.id === usuario.id,
    );
	
	// Detenemos la operación si encontramos un usuario con el mismo identificador.
    if (existe) {
        throw new Error(
            'El usuario ya existe.',
        );
    }
	
	// Si no existe Agregamos el usuario al array
    this.usuarios.push(usuario);

    return usuario;
}

/* ========================================= 
		BUSCAR USUARIO POR ID
========================================= */
buscarUsuarioPorId(usuarioId) {
    return this.usuarios.find(
        (usuario) => usuario.id === usuarioId,
    ) || null;
}

/* AGREGAMOS CUENTA */
agregarCuenta(cuenta){
    const usuario = this.buscarUsuarioPorId(cuenta.usuarioId,);

    if(!usuario){
        throw new Error(
            'El usuario propietario de la cuenta no existe',
        );
    }
    const existe = this.cuentas.some(
        (c) => 
            c.id === cuenta.id ||
        c.numeroCuenta === cuenta.numeroCuenta,
    );

    if(existe){
        throw new Error(
            'La cuenta ya existe.',
        );
    }
    this.cuentas.push(cuenta);
    return cuenta; 

}

/* BUSQUEDA DE CUENTA POR ID  */
buscarCuentaPorId(cuentaId){
    return this.cuentas.find(
        (cuenta) => cuenta.id === cuentaId,) || null;
}

/* BUSCAMOS CUENTA POR NUMERO */
buscarCuentaPorNumero(numeroCuenta){
    return this.cuentas.find(
        (cuenta) => cuenta.numeroCuenta === numeroCuenta,) || null;
}

// OBTENEMOS CUENTAS DE USUARIO
obtenerCuentasdeUsuario(usuarioId){
    return this.cuentas.filter((cuenta) => cuenta.usuarioId === usuarioId,);
}

//REGISTRAR LOS MOVIMIENTOS
registrarMovimiento(movimiento){
    this.movimientos.push(movimiento);
    return movimiento;
}

//REALIZAR DEPOSITO
realizarDeposito({
    cuentaId, monto, descripcion = '',
}){
    //se convierte a monto
    const montoNumerico = Number(monto);
    if(
        !Number.isFinite(montoNumerico) || montoNumerico <= 0
    ){
        throw new Error('El monto debe ser mayor a cero');
    }

    const cuenta = this.buscarCuentaPorId(cuentaId);
    if(!cuenta){
        throw new Error('Esta cuenta no existe');
    }

    //ACTUALIZAMOS EL SALDO
    cuenta.depositar(montoNumerico);
    const movimiento = new Movimiento({
        tipo: 'DEPOSITO',
        monto: montoNumerico,
        descripcion,
        cuentaOrigen: cuenta.id,
        saldoResultante: cuenta.saldo,
    });

    //se registran los movimientos
    this.registrarMovimiento(movimiento);
    return movimiento;
}

/*obtenemos los movimientos de la cuenta, aquí se va a devolver todos
los movimientos en los que la cuenta aparezca
*/
obtenerMovimientosdeCuenta(cuentaId){
    return this.movimientos.filter((movimiento) => movimiento.cuentaOrigen === cuentaId
    || movimiento.cuentaDestino === cuentaId);
}



}

