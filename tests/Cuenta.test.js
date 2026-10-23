/* =========================================
   PRUEBAS DEL MODELO CUENTA
========================================= */

import {
    Cuenta,
} from '../js/models/Cuenta.js';


describe(
    'Cuenta',
    () => {

        /* =================================
           CREACIÓN
        ================================= */

        test(
            'debe crear una cuenta con saldo inicial',
            () => {
                const cuenta =
                    new Cuenta({
                        numeroCuenta:
                            '111111111111',

                        usuarioId:
                            'u1',

                        saldo:
                            500,
                    });


                expect(
                    cuenta.numeroCuenta,
                ).toBe(
                    '111111111111',
                );


                expect(
                    cuenta.saldo,
                ).toBe(500);
            },
        );


        /* =================================
           DEPÓSITOS
        ================================= */

        test(
            'debe aumentar el saldo al depositar',
            () => {
                const cuenta =
                    new Cuenta({
                        numeroCuenta:
                            '111111111111',

                        usuarioId:
                            'u1',

                        saldo:
                            500,
                    });


                cuenta.depositar(
                    300,
                );


                expect(
                    cuenta.saldo,
                ).toBe(800);
            },
        );


        /* =================================
           RETIROS
        ================================= */

        test(
            'debe disminuir el saldo al retirar',
            () => {
                const cuenta =
                    new Cuenta({
                        numeroCuenta:
                            '111111111111',

                        usuarioId:
                            'u1',

                        saldo:
                            1000,
                    });


                cuenta.retirar(
                    250,
                );


                expect(
                    cuenta.saldo,
                ).toBe(750);
            },
        );


        test(
            'no debe permitir retirar mas dinero del disponible',
            () => {
                const cuenta =
                    new Cuenta({
                        numeroCuenta:
                            '111111111111',

                        usuarioId:
                            'u1',

                        saldo:
                            100,
                    });


                expect(
                    () => {
                        cuenta.retirar(
                            500,
                        );
                    },
                ).toThrow(
                    'Saldo insuficiente',
                );
            },
        );

    },
);