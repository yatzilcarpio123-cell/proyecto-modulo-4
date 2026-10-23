/* =========================================
   PRUEBAS DE HELPERS
========================================= */

import {
    generarId,
    generarNumeroCuenta,
} from '../js/utils/helpers.js';


describe(
    'helpers',
    () => {

        /* =================================
           GENERAR ID
        ================================= */

        test(
            'debe generar identificadores diferentes',
            () => {
                const id1 =
                    generarId();

                const id2 =
                    generarId();


                expect(
                    typeof id1,
                ).toBe('string');


                expect(id1)
                    .not
                    .toBe(id2);
            },
        );


        /* =================================
           NÚMERO DE CUENTA
        ================================= */

        test(
            'debe generar un numero de cuenta de 12 digitos',
            () => {
                const numero =
                    generarNumeroCuenta();


                expect(
                    numero,
                ).toMatch(
                    /^\d{12}$/,
                );
            },
        );

    },
);