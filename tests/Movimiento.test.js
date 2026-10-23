/* =========================================
   PRUEBAS DEL MODELO MOVIMIENTO
========================================= */

import {
    Movimiento,
} from '../js/models/Movimiento.js';


describe(
    'Movimiento',
    () => {

        /* =================================
           CREACIÓN
        ================================= */

        test(
            'debe crear un movimiento con sus datos',
            () => {
                const movimiento =
                    new Movimiento({
                        tipo:
                            'DEPOSITO',

                        monto:
                            1000,

                        descripcion:
                            'Prueba',

                        cuentaOrigen:
                            'c1',

                        saldoResultante:
                            1000,
                    });


                expect(
                    movimiento.tipo,
                ).toBe(
                    'DEPOSITO',
                );


                expect(
                    movimiento.monto,
                ).toBe(1000);


                expect(
                    movimiento
                        .saldoResultante,
                ).toBe(1000);
            },
        );


        test(
            'debe generar identificador y fecha',
            () => {
                const movimiento =
                    new Movimiento({
                        tipo:
                            'DEPOSITO',

                        monto:
                            100,

                        cuentaOrigen:
                            'c1',

                        saldoResultante:
                            100,
                    });


                expect(
                    movimiento.id,
                ).toBeTruthy();


                expect(
                    movimiento.fecha,
                ).toBeTruthy();
            },
        );

    },
);