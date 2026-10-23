/* =========================================
   PRUEBAS DEL MODELO USUARIO
========================================= */

import {
    Usuario,
} from '../js/models/Usuario.js';


describe(
    'Usuario',
    () => {

        /* =================================
           CREACIÓN
        ================================= */

        test(
            'debe crear un usuario con los datos recibidos',
            () => {
                const usuario =
                    new Usuario({
                        nombre:
                            'Yatzil Carpio',

                        email:
                            'yatzil@correo.com',

                        telefono:
                            '5580970111',

                        password:
                            '123456',
                    });


                expect(
                    usuario.nombre,
                ).toBe(
                    'Yatzil Carpio',
                );


                expect(
                    usuario.email,
                ).toBe(
                    'yatzil@correo.com',
                );


                expect(
                    usuario.telefono,
                ).toBe(
                    '5580970111',
                );
            },
        );


        test(
            'debe generar un id y quedar activo',
            () => {
                const usuario =
                    new Usuario({
                        nombre:
                            'Alejandra Lopez',

                        email:
                            'ale@correo.com',

                        password:
                            'abcdef',
                    });


                expect(
                    usuario.id,
                ).toBeTruthy();


                expect(
                    usuario.activo,
                ).toBe(true);
            },
        );

    },
);