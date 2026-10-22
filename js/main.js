/* HACEMOS LAS IMPORTACIONES  */
import {
    Usuario,
} from './models/Usuario.js';

import {
    Cuenta,
} from './models/Cuenta.js';

import {
    generarNumeroCuenta,
} from './utils/helpers.js';

import {
    validarCampoObligatorio,
} from './utils/validators.js';

import {
    STORAGE_KEYS,
    storageService,
} from './services/StorageService.js';

/*IMPORTACION AUTH SERVICE*/
import {
    authService,
} from './services/AuthService.js';

/* INICIAMOS STORAGE */
function inicializarStorage() {
	
    /* RECUPERAMOS USUARIOS */
    const usuarios =
        storageService.obtener(
            STORAGE_KEYS.USUARIOS,
            null,
        );

	/* RECUPERAMOS CUENTAS */
    const cuentas =
        storageService.obtener(
            STORAGE_KEYS.CUENTAS,
            null,
        );

	/* RECUPERAMOS MOVIMIENTOS */
    const movimientos =
        storageService.obtener(
            STORAGE_KEYS.MOVIMIENTOS,
            null,
        );


	/* INICIAMOS USUARIOS */
    if (usuarios === null) {
        storageService.guardar(
            STORAGE_KEYS.USUARIOS,
            [],
        );
    }

	/* INICIAMOS CUENTAS */
    if (cuentas === null) {
        storageService.guardar(
            STORAGE_KEYS.CUENTAS,
            [],
        );
    }

	/* INICIAMOS MOVIMIENTOS */
    if (movimientos === null) {
        storageService.guardar(
            STORAGE_KEYS.MOVIMIENTOS,
            [],
        );
    }
}

/* MANEJAMOS EL REGISTRO */
function manejarRegistro(event) {

    event.preventDefault();

	/* SE OBTIENE NOMBRE */
    const nombre =
        document
            .querySelector(
                '#registroNombre',
            )
            .value
            .trim();

	/* OBTENEMOS EL EMAIL */
    const email =
        document
            .querySelector(
                '#registroEmail',
            )
            .value
            .trim()
            .toLowerCase();

	/* OBTENEMOS EL TELEFONO */
    const telefono =
        document
            .querySelector(
                '#registroTelefono',
            )
            .value
            .trim();

	/* OBTENEMOS LA CONTRASEÑA */
    const password =
        document
            .querySelector(
                '#registroPassword',
            )
            .value;

	/* CONFIRMAMOS CONTRASEÑA  */
    const confirmarPassword =
        document
            .querySelector(
                '#registroConfirmPassword',
            )
            .value;

	/*VALIDAMOS CAMPOS  */
    if (
        !validarCampoObligatorio(
            nombre,
        ) ||
        !validarCampoObligatorio(
            email,
        ) ||
        !validarCampoObligatorio(
            password,
        )
    ) {
        Swal.fire({
            icon: 'warning',
            title:
                'Campos incompletos',
            text:
                'Completa los campos obligatorios.',
        });

        return;
    }

	/* VALIDAMOS LONGITUD */
    if (password.length < 6) {
        Swal.fire({
            icon: 'warning',
            title:
                'Contraseña inválida',
            text:
                'La contraseña debe tener al menos 6 caracteres.',
        });

        return;
    }

	/* COMPARAMSO CONTRASELÑAS */
    if (
        password !==
        confirmarPassword
    ) {
        Swal.fire({
            icon: 'warning',
            title:
                'Contraseñas diferentes',
            text:
                'Las contraseñas no coinciden.',
        });

        return;
    }

	/* RECUPERAMOS USUARIOS */
    const usuarios =
        storageService.obtener(
            STORAGE_KEYS.USUARIOS,
            [],
        );

	/* COMRPOBAMOS EMAUKL*/
    const emailExistente =
        usuarios.some(
            (usuario) =>
                usuario.email
                    .toLowerCase() ===
                email,
        );

	/* SI EL EMAIL ES DUPLICAOD */
    if (emailExistente) {
        Swal.fire({
            icon: 'error',
            title:
                'Correo registrado',
            text:
                'Ya existe un usuario con este correo.',
        });

        return;
    }

	/* CREAMOS AL USUARIO */
    const nuevoUsuario =
        new Usuario({
            nombre,
            email,
            telefono,
            password,
        });

	/* GENERAMOS NUMERO DE CUENTA */
    let numeroCuenta;


    do {
        numeroCuenta =
            generarNumeroCuenta();
    } while (
        storageService
            .obtener(
                STORAGE_KEYS.CUENTAS,
                [],
            )
            .some(
                (cuenta) =>
                    cuenta.numeroCuenta ===
                    numeroCuenta,
            )
    );

	/* CREAMOS CUENTA */
    const nuevaCuenta =
        new Cuenta({
            numeroCuenta,
            tipo: 'Ahorro',
            saldo: 0,
            usuarioId:
                nuevoUsuario.id,
        });

	/* RECUPERAMOS CUENTA */
    const cuentas =
        storageService.obtener(
            STORAGE_KEYS.CUENTAS,
            [],
        );

	
	/* =AGREGAMOS USUARIO */
    usuarios.push(
        nuevoUsuario,
    );

	/* AGREGAMOS CUENTA  */
    cuentas.push(
        nuevaCuenta,
    );

	/* GUARDAMOS USUARIO  */
    storageService.guardar(
        STORAGE_KEYS.USUARIOS,
        usuarios,
    );

	/* GUARDAMOS CUENTA */
    storageService.guardar(
        STORAGE_KEYS.CUENTAS,
        cuentas,
    );

	/* SI EL REGISTRO ES EXITOSO */
    Swal.fire({
        icon: 'success',
        title:
            'Registro exitoso',
        text:
            'Tu usuario y cuenta bancaria fueron creados correctamente.',
        confirmButtonText:
            'Continuar',
    }).then(() => {
    
	    /* LIMPIAMOS FORMULARIO  */
        document
            .querySelector(
                '#formRegistro',
            )
            .reset();

		
        document
            .querySelector(
                '#loginEmail',
            )
            .value = email;
    });
}

/* MANEJAMOS LOGIN */
function manejarLogin(event) {
    event.preventDefault();

	/* OBTENEMOS EMAIL*/
    const email =
        document
            .querySelector(
                '#loginEmail',
            )
            .value
            .trim()
            .toLowerCase();

	/* OBTENEMOS CONTRASEÑA  */
    const password =
        document
            .querySelector(
                '#loginPassword',
            )
            .value;

	/* VALIDAMOS LOS CMAPOS */
    if (
        !validarCampoObligatorio(
            email,
        ) ||
        !validarCampoObligatorio(
            password,
        )
    ) {
        Swal.fire({
            icon: 'warning',
            title:
                'Campos incompletos',
            text:
                'Ingresa tu correo y contraseña.',
        });

        return;
    }
    try {
        const usuario =
            authService.login(
                email,
                password,
            );

		/*LOGIN EXITOSO*/
        Swal.fire({
            icon: 'success',
            title:
                `Bienvenido, ${usuario.nombre}`,
            text:
                'Inicio de sesión correcto.',
            timer: 1500,
            showConfirmButton:
                false,
        }).then(() => {
            window.location.href =
                'dashboard.html';
        });
    } catch (error) {
	    
	    /* ERROR DE LOGIN*/
        Swal.fire({
            icon: 'error',
            title:
                'No fue posible iniciar sesión',
            text:
                error.message,
        });
    }
}

/*INICIALIZAR */
function init() {

	/* INICIALIZAR STORAGE */
    inicializarStorage();

	/* =COMRPOBAR SESION */
    if (
        authService
            .getCurrentUser()
    ) {
        window.location.href =
            'dashboard.html';

        return;
    }

	/* OBTENEMOOS LOGIN */
    const formLogin =
        document.querySelector(
            '#formLogin',
        );

	/* OBTENEMOS REGISTRO */
    const formRegistro =
        document.querySelector(
            '#formRegistro',
        );

	/* EVENTO DEL LOGUIN */
    if (formLogin) {
        formLogin.addEventListener(
            'submit',
            manejarLogin,
        );
    }

	/* EVENTO DEL REGISTRO  */
    if (formRegistro) {
        formRegistro.addEventListener(
            'submit',
            manejarRegistro,
        );
    }
}

init();