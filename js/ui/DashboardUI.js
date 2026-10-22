/* IMPORTAMOS AUTH SERVICE*/
import {
    authService,
} from '../services/AuthService.js';

/* MOSTRAMOS AL USUARIO */
function mostrarUsuario() {

	/* OBTENEMOS EL USUARIO ACTUAL */
    const usuario =
        authService
            .getCurrentUser();

	/* VALIDAMOS AL USUARIO */
    if (!usuario) {
        return;
    }

	/* OBTENEMOS EL ELEMENTO  */
    const nombreUsuario =
        document.querySelector(
            '#nombreUsuario',
        );

	/* MOSTRAMOS EL NOMBRE */
    if (nombreUsuario) {
        nombreUsuario.textContent =
            `Sesión iniciada como ${usuario.nombre}`;
    }
}

/* INICIALIZAMOS EL LOGOUT*/
function inicializarLogout() {
    const logoutBtn =
        document.querySelector(
            '#logoutBtn',
        );

	/*VALIDAMOS BOTON*/
    if (!logoutBtn) {
        return;
    }

	/* HACEMOS EVENTO CLICK */
    logoutBtn.addEventListener(
        'click',
        () => {
        
	        /* CONFIRMA SALIDA*/
            Swal.fire({
                icon: 'question',
                title:
                    'Cerrar sesión',
                text:
                    '¿Seguro que deseas salir?',
                showCancelButton:
                    true,
                confirmButtonText:
                    'Sí, salir',
                cancelButtonText:
                    'Cancelar',
            }).then((result) => {
	            
	            /* CANCELAR LA SALIDA*/
                if (
                    !result.isConfirmed
                ) {
                    return;
                }

				/* CERRAR SESION */
                authService.logout();

				/* REDIRIGIR*/
                window.location.href =
                    'index.html';
            });
        },
    );
}

/* INICIALIZAE DASHBOARD */
function init() {

    const accesoPermitido =
        authService
            .protegerRuta();

	/* DETENER SIN ACCESO */
    if (!accesoPermitido) {
        return;
    }

	/* MOSTRAMOS EL USUARIO */
    mostrarUsuario();
    
    /* =ACTIVAMOS EL LOGOUT */
    inicializarLogout();
}
init();