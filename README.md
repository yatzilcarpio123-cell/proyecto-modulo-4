# Sistema de Gestión Bancaria

Proyecto integrador correspondiente al Módulo 4.

El proyecto se desarrolla progresivamente utilizando JavaScript moderno, arquitectura modular, programación orientada a objetos y programación funcional.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- ECMAScript Modules
- Node.js
- npm
- LocalStorage
- SweetAlert2
- Git
- GitHub

## Arquitectura

El proyecto utiliza las siguientes capas:

- Models
- Services
- UI
- Utils
- Tests

## Arquitectura actual

```text
js/
├── main.js
│
├── models/
│   ├── Banco.js
│   ├── Cuenta.js
│   ├── Movimiento.js
│   └── Usuario.js
│
├── services/
│   ├── AuthService.js
│   ├── BancoService.js
│   └── StorageService.js
│
├── ui/
│   └── DashboardUI.js
│
└── utils/
    ├── formatters.js
    ├── helpers.js
    └── validators.js
```

## Models

### Usuario

Representa a una persona registrada en el sistema.

### Cuenta

Representa una cuenta bancaria perteneciente a un usuario.

### Movimiento

Representa una operación bancaria.

### Banco

Coordina usuarios, cuentas y movimientos y contiene reglas del dominio bancario.

## Services

### StorageService

Centraliza la comunicación con LocalStorage.

Métodos principales:

- `guardar()`
- `obtener()`
- `eliminar()`
- `limpiar()`

### AuthService

Gestiona autenticación y sesión.

Métodos principales:

- `login()`
- `logout()`
- `getCurrentUser()`
- `protegerRuta()`

### BancoService

Conecta los datos persistidos con los modelos del dominio.

Métodos principales:

- `cargarBanco()`
- `obtenerInstanciaBanco()`
- `recargarBanco()`
- `guardarBanco()`
- `obtenerDatosUsuario()`
- `obtenerResumenUsuario()`

## Dashboard

El dashboard permite mostrar información correspondiente al usuario autenticado.

Actualmente muestra:

- Nombre del usuario.
- Saldo total.
- Cantidad de cuentas.
- Cantidad de movimientos.
- Número de cuenta principal.
- Tipo de cuenta.
- Saldo disponible.

## Flujo de información

```text
LocalStorage
    ↓
StorageService
    ↓
BancoService
    ↓
Banco
    ↓
DashboardUI
    ↓
dashboard.html
```

## Funcionalidades implementadas

Actualmente el sistema permite:

- Registrar usuarios.
- Crear una cuenta automáticamente.
- Evitar correos duplicados.
- Iniciar sesión.
- Mantener sesión.
- Cerrar sesión.
- Proteger páginas.
- Persistir información.
- Reconstruir modelos desde LocalStorage.
- Consultar información bancaria.
- Calcular saldo total.
- Consultar cuentas del usuario.
- Consultar movimientos.
- Mostrar un dashboard dinámico.
- Utilizar SweetAlert2 para mensajes y confirmaciones.

## Navegación prevista

La aplicación tendrá las páginas:

- `dashboard.html`
- `cuenta.html`
- `movimientos.html`
- `transferencia.html`

Las páginas restantes serán implementadas progresivamente en las siguientes versiones.

## Versión actual

v0.7.0 — BancoService y Dashboard bancario.