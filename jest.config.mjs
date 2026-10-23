/* =========================================
   CONFIGURACIÓN DE JEST
========================================= */

export default {

    /* =====================================
       ENTORNO DE PRUEBAS
    ====================================== */

    // jsdom proporciona APIs similares a las
    // del navegador, incluyendo localStorage.
    testEnvironment:
        'jsdom',


    /* =====================================
       UBICACIÓN DE LAS PRUEBAS
    ====================================== */

    // Jest buscará nuestras suites dentro
    // de la carpeta tests/.
    roots: [
        '<rootDir>/tests',
    ],


    /* =====================================
       ECMASCRIPT MODULES
    ====================================== */

    // Nuestro código utiliza import/export
    // directamente y no necesita Babel.
    transform: {},

};