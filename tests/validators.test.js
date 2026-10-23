/* =========================================
   PRUEBAS DE VALIDADORES
========================================= */

import {
    validarCampoObligatorio,
    validarMonto,
} from '../js/utils/validators.js';


describe(
    'validators',
    () => {

        /* =================================
           CAMPOS OBLIGATORIOS
        ================================= */

        test(
            'debe aceptar un campo con contenido',
            () => {
                expect(
                    validarCampoObligatorio(
                        'Juan',
                    ),
                ).toBe(true);
            },
        );


        test(
            'debe rechazar un campo vacío',
            () => {
                expect(
                    validarCampoObligatorio(
                        '',
                    ),
                ).toBe(false);
            },
        );


        /* =================================
           MONTOS
        ================================= */

        test(
            'debe aceptar un monto mayor a cero',
            () => {
                expect(
                    validarMonto(500),
                ).toBe(true);
            },
        );


        test(
            'debe rechazar monto cero o negativo',
            () => {
                expect(
                    validarMonto(0),
                ).toBe(false);


                expect(
                    validarMonto(-100),
                ).toBe(false);
            },
        );

    },
);