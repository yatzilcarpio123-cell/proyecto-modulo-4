/* IMPORTAMOS STORAGE SERVICE  */
import {
    STORAGE_KEYS,
    storageService,
} from './StorageService.js';

/* SERVICIO DE AUTENTICACION */
class AuthService {

	/* PASO PARA INICIAR SESION */
    login(email, password) {
    
	   /* SE RECUPERA AL USUARIO */
        const usuarios =
            storageService.obtener(
                STORAGE_KEYS.USUARIOS,
                [],
            );

		/* SE NORMALIZA EL CORREO ELECTRÓNICO */
        const emailNormalizado =
            String(email)
                .trim()
                .toLowerCase();

		/* BUSCAMOS AL USUARIO */
        const usuario =
            usuarios.find(
                (u) =>
                    u.email.toLowerCase() ===
                        emailNormalizado &&
                    u.password ===
                        password &&
                    u.activo !== false,
            );

		/* VALIDAMOS LAS CREDENCIALES */
        if (!usuario) {
            throw new Error(
                'Correo o contraseña incorrectos.',
            );
        }

	/* CERRAMOS LA SESIÓN */
        const sesion = {
            usuarioId:
                usuario.id,
            fechaInicio:
                new Date()
                    .toISOString(),
        };
        /* GUARDAMOS LA SESIÓN */
        storageService.guardar(
            STORAGE_KEYS.SESION,
            sesion,
        );
		
		/* DEVOLVEMOS AL USUARIO  */
        return usuario;
    }

	/* CERRAMOS SESION */
    logout() {
        storageService.eliminar(
            STORAGE_KEYS.SESION,
        );
    }
    /* OBTENEMOS AL USUARIO ACTUAL  */
    getCurrentUser() {
    
	    /* RECUPERAMOS LA SESION */
        const sesion =
            storageService.obtener(
                STORAGE_KEYS.SESION,
                null,
            );
	
		/* VALIDAMOS SESION */
        if (!sesion) {
            return null;
        }

		/* RECUPERAMOS USUARIOS */
        const usuarios =
            storageService.obtener(
                STORAGE_KEYS.USUARIOS,
                [],
            );

		/* BUSCAMOS USUARIOS */
        return (
            usuarios.find(
                (usuario) =>
                    usuario.id ===
                    sesion.usuarioId,
            ) || null
        );
    }

	/*PROTEGEMOS RUTA */
    protegerRuta() {
    
	    /* OBTENEMOS USUARIO */
        const usuario =
            this.getCurrentUser();

        if (!usuario) {
            window.location.href =
                'index.html';

            return false;
        }
		
        /* ACCESO PERMITIDO */
        return true;
    }
}

/** INSTACIOIAMOS AUTH SERVICE */
export const authService =
    new AuthService();