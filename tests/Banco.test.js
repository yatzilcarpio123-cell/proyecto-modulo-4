/* =========================================
   PRUEBAS DEL MODELO BANCO
========================================= */

import {
    Banco,
} from '../js/models/Banco.js';

import {
    Cuenta,
} from '../js/models/Cuenta.js';


/* =========================================
   DATOS DE PRUEBA
========================================= */

function crearBancoPrueba() {

    const cuentaOrigen =
        new Cuenta({
            id:
                'c1',

            numeroCuenta:
                '111111111111',

            usuarioId:
                'u1',

            saldo:
                1000,
        });


    const cuentaDestino =
        new Cuenta({
            id:
                'c2',

            numeroCuenta:
                '222222222222',

            usuarioId:
                'u2',

            saldo:
                500,
        });


    const banco =
        new Banco({
            usuarios: [
                {
                    id:
                        'u1',
                },

                {
                    id:
                        'u2',
                },
            ],

            cuentas: [
                cuentaOrigen,
                cuentaDestino,
            ],

            movimientos: [],
        });


    return {
        banco,
        cuentaOrigen,
        cuentaDestino,
    };
}


describe(
    'Banco',
    () => {

        /* =================================
           TRANSFERENCIA CORRECTA
        ================================= */

        test(
            'debe transferir dinero entre dos cuentas',
            () => {
                const {
                    banco,
                    cuentaOrigen,
                    cuentaDestino,
                } =
                    crearBancoPrueba();


                banco.realizarTransferencia({
                    cuentaOrigenId:
                        cuentaOrigen.id,

                    cuentaDestinoId:
                        cuentaDestino.id,

                    monto:
                        200,

                    descripcion:
                        'Prueba',
                });


                expect(
                    cuentaOrigen.saldo,
                ).toBe(800);


                expect(
                    cuentaDestino.saldo,
                ).toBe(700);
            },
        );


        /* =================================
           MOVIMIENTOS GENERADOS
        ================================= */

        test(
            'debe crear movimientos enviado y recibido',
            () => {
                const {
                    banco,
                    cuentaOrigen,
                    cuentaDestino,
                } =
                    crearBancoPrueba();


                banco.realizarTransferencia({
                    cuentaOrigenId:
                        cuentaOrigen.id,

                    cuentaDestinoId:
                        cuentaDestino.id,

                    monto:
                        200,
                });


                expect(
                    banco.movimientos,
                ).toHaveLength(2);


                expect(
                    banco
                        .movimientos[0]
                        .tipo,
                ).toBe(
                    'TRANSFERENCIA_ENVIADA',
                );


                expect(
                    banco
                        .movimientos[1]
                        .tipo,
                ).toBe(
                    'TRANSFERENCIA_RECIBIDA',
                );
            },
        );


        /* =================================
           MISMA CUENTA
        ================================= */

        test(
            'no debe transferir a la misma cuenta',
            () => {
                const {
                    banco,
                    cuentaOrigen,
                } =
                    crearBancoPrueba();


                expect(
                    () => {
                        banco
                            .realizarTransferencia({
                                cuentaOrigenId:
                                    cuentaOrigen.id,

                                cuentaDestinoId:
                                    cuentaOrigen.id,

                                monto:
                                    100,
                            });
                    },
                ).toThrow(
                    'No puedes transferir dinero a la misma cuenta',
                );
            },
        );


        /* =================================
           SALDO INSUFICIENTE
        ================================= */

        test(
            'no debe transferir cuando el saldo es insuficiente',
            () => {
                const {
                    banco,
                    cuentaOrigen,
                    cuentaDestino,
                } =
                    crearBancoPrueba();


                expect(
                    () => {
                        banco
                            .realizarTransferencia({
                                cuentaOrigenId:
                                    cuentaOrigen.id,

                                cuentaDestinoId:
                                    cuentaDestino.id,

                                monto:
                                    5000,
                            });
                    },
                ).toThrow(
                    'Saldo insuficiente',
                );
            },
        );

    },
);