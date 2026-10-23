/* =========================================
   PRUEBAS DE AUTHSERVICE
========================================= */

import {
    authService,
} from '../js/services/AuthService.js';

import {
    STORAGE_KEYS,
    storageService,
} from '../js/services/StorageService.js';


describe(
    'AuthService',
    () => {

        /* =================================
           PREPARACIÓN
        ================================= */

        beforeEach(
            () => {
                // Dejamos LocalStorage limpio
                // antes de cada prueba.
                localStorage.clear();


                // Creamos un usuario conocido para
                // utilizarlo durante autenticación.
                storageService.guardar(
                    STORAGE_KEYS.USUARIOS,
                    [
                        {
                            id:
                                'u1',

                            nombre:
                                'Yatzil',

                            email:
                                'yatzil@correo.com',

                            password:
                                '123456',

                            activo:
                                true,
                        },
                    ],
                );
            },
        );


        /* =================================
           LOGIN CORRECTO
        ================================= */

        test(
            'debe iniciar sesion con credenciales correctas',
            () => {
                const usuario =
                    authService.login(
                        'yatzil@correo.com',
                        '123456',
                    );


                expect(
                    usuario.id,
                ).toBe('u1');


                // Comprobamos que además del retorno
                // se haya creado una sesión.
                const sesion =
                    storageService.obtener(
                        STORAGE_KEYS.SESION,
                        null,
                    );


                expect(
                    sesion.usuarioId,
                ).toBe('u1');
            },
        );


        /* =================================
           LOGIN INCORRECTO
        ================================= */

        test(
            'debe rechazar credenciales incorrectas',
            () => {
                expect(
                    () => {
                        authService.login(
                            'yatzil@correo.com',
                            'incorrecta',
                        );
                    },
                ).toThrow(
                    'Correo o contraseña incorrectos.',
                );
            },
        );


        /* =================================
           USUARIO ACTUAL
        ================================= */

        test(
            'debe recuperar el usuario autenticado',
            () => {
                authService.login(
                    'yatzil@correo.com',
                    '123456',
                );


                const usuario =
                    authService
                        .getCurrentUser();


                expect(
                    usuario.id,
                ).toBe('u1');
            },
        );


        /* =================================
           CERRAR SESIÓN
        ================================= */

        test(
            'debe eliminar la sesion al cerrar sesion',
            () => {
                authService.login(
                    'yatzil@correo.com',
                    '123456',
                );


                authService.logout();


                const sesion =
                    storageService.obtener(
                        STORAGE_KEYS.SESION,
                        null,
                    );


                expect(
                    sesion,
                ).toBeNull();
            },
        );

    },
);