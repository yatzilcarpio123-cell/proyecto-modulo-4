import {
    Banco,
} from '../models/Banco.js';

import {
    Usuario,
} from '../models/Usuario.js';

import {
    Cuenta,
} from '../models/Cuenta.js';

import {
    Movimiento,
} from '../models/Movimiento.js';

import {
    STORAGE_KEYS,
    storageService,
} from './StorageService.js';


class BancoService {
    constructor() {
        this._banco = null;
    }


    cargarBanco() {
        const usuariosGuardados =
            storageService.obtener(
                STORAGE_KEYS.USUARIOS,
                [],
            );

        const cuentasGuardadas =
            storageService.obtener(
                STORAGE_KEYS.CUENTAS,
                [],
            );

        const movimientosGuardados =
            storageService.obtener(
                STORAGE_KEYS.MOVIMIENTOS,
                [],
            );


        const usuarios =
            usuariosGuardados.map(
                (usuario) =>
                    new Usuario(usuario),
            );

        const cuentas =
            cuentasGuardadas.map(
                (cuenta) =>
                    new Cuenta(cuenta),
            );

        const movimientos =
            movimientosGuardados.map(
                (movimiento) =>
                    new Movimiento(
                        movimiento,
                    ),
            );


        this._banco =
            new Banco({
                usuarios,
                cuentas,
                movimientos,
            });


        return this._banco;
    }


    obtenerInstanciaBanco() {
        if (!this._banco) {
            return this.cargarBanco();
        }

        return this._banco;
    }


    recargarBanco() {
        this._banco = null;

        return this.cargarBanco();
    }


    guardarBanco() {
        const banco =
            this.obtenerInstanciaBanco();


        storageService.guardar(
            STORAGE_KEYS.USUARIOS,
            banco.usuarios,
        );

        storageService.guardar(
            STORAGE_KEYS.CUENTAS,
            banco.cuentas,
        );

        storageService.guardar(
            STORAGE_KEYS.MOVIMIENTOS,
            banco.movimientos,
        );


        return true;
    }


    obtenerDatosUsuario(
        usuarioId,
    ) {
        const banco =
            this.obtenerInstanciaBanco();


        const usuario =
            banco.buscarUsuarioPorId
                ? banco.buscarUsuarioPorId(usuarioId)
                : banco.usuarios.find(u => u.id === usuarioId);


        if (!usuario) {
            throw new Error(
                'El usuario no existe.',
            );
        }


        const cuentas =
            banco.cuentas.filter(
                (cuenta) =>
                    cuenta.usuarioId === usuarioId,
            );


        const movimientosSinFiltrar =
            cuentas.flatMap(
                (cuenta) =>
                    banco.movimientos.filter(
                        (movimiento) =>
                            movimiento.cuentaId === cuenta.id,
                    ),
            );


        const movimientos =
            movimientosSinFiltrar.filter(
                (
                    movimiento,
                    index,
                    array,
                ) =>
                    index ===
                    array.findIndex(
                        (item) =>
                            item.id ===
                            movimiento.id,
                    ),
            );


        return {
            usuario,
            cuentas,
            movimientos,
        };
    }


    obtenerResumenUsuario(
        usuarioId,
    ) {
        const {
            usuario,
            cuentas,
            movimientos,
        } =
            this.obtenerDatosUsuario(
                usuarioId,
            );


        const saldoTotal =
            cuentas.reduce(
                (
                    acumulado,
                    cuenta,
                ) =>
                    acumulado +
                    Number(
                        cuenta.saldo,
                    ),
                0,
            );


        return {
            usuario,
            cuentas,
            movimientos,
            saldoTotal,
            totalCuentas:
                cuentas.length,
            totalMovimientos:
                movimientos.length,
        };
    }
}


export const bancoService =
    new BancoService();