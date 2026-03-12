 Makeup Store SPA
Una Single Page Application de maquillaje moderna y dinámica, desarrollada con React, enfocada en la persistencia de datos y una experiencia de usuario fluida.

 Descripción

Este proyecto es una SPA (Single Page Application) diseñada para una tienda de maquillaje. El objetivo principal fue implementar conceptos avanzados de React para crear una interfaz donde la información persiste y los componentes se comunican de forma eficiente sin depender de una base de datos externa, utilizando el almacenamiento local del navegador.


 Características Principales

Persistencia de Datos: Implementación de LocalStorage para que el carrito y la lista de favoritos se mantengan intactos incluso tras recargar la página.

Comunicación entre Componentes: Uso de window.dispatchEvent (Eventos Personalizados) para sincronizar el contador del Header con las acciones en las páginas de productos en tiempo real.

Gestión de Carrito (CRUD): Sistema completo para sumar, restar y eliminar productos con actualización instantánea.

Optimización de Rendimiento: Uso de useMemo para el cálculo automático de totales, evitando renderizados innecesarios y garantizando fluidez.

Navegación Fluida: Implementación de react-router-dom para transiciones instantáneas entre secciones (Tienda, Carrito, Favoritos) sin recarga de página.


 Interfaz Gráfica
La aplicación cuenta con una identidad visual moderna y juvenil, diseñada para ser totalmente Responsiva.

Paleta de Colores: Basada en el tono vibrante rosado pastel con contrastes en negro para una estética definida.

UI Framework: Uso de Material UI (MUI) mediante componentes como Cards, Grids y Stacks para asegurar una disposición profesional en móviles y escritorio.

UX Centrada en el Usuario: Feedback visual inmediato al agregar productos y navegación intuitiva.


 Arquitectura del Proyecto
El proyecto sigue una estructura modular basada en componentes funcionales de React, facilitando el mantenimiento y la escalabilidad.

Estructura de Directorios
Plaintext
src/
├── components/
│   ├── Content.js      
│   ├── Articles.js     
│   ├── MyCart.js      
│   ├── Myfavorites.js  
│   └── MyBuys.js       
├── App.js              
└── index.js           

👤 Datos del Autor
Desarrollador: [Estefany Arango]

Rol: Frontend Developer / React Enthusiast

Enfoque: Creación de experiencias de usuario interactivas y código optimizado.