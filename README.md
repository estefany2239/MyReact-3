 Descripción del Proyecto

Este proyecto es una Single Page Application (SPA) de una tienda de maquillaje. El objetivo principal fue aplicar conceptos avanzados de React para crear una experiencia de usuario dinámica, donde la información persiste y los componentes se comunican entre sí sin necesidad de una base de datos externa todavía.

 Lo que logré implementar:

1. Gestión de Estado y Persistencia
LocalStorage: Logré que tanto el carrito como los favoritos no se borren al recargar la página. Los datos se guardan en el navegador del usuario.

Eventos Personalizados: Como el Header y las Páginas están separados, utilicé window.dispatchEvent para avisarle al contador de la barrita de navegación cuando el usuario agrega o elimina algo en tiempo real.

2. Lógica del Carrito (CRUD)

Implementé un sistema donde se puede:

Sumar/Restar cantidades de un mismo producto.

Eliminar productos específicos.

Calcular el Total automáticamente usando useMemo para que la página no se ponga lenta si hay muchos productos.

3. Interfaz y UX (User Experience)

Diseño con Material UI: Usé componentes como Cards, Grids y Stacks para que la página sea Responsiva (se ve bien en celular y PC).

Navegación: Usé react-router-dom para moverme entre la tienda, el carrito y los favoritos sin que la página parpadee.

Identidad Visual: Definí una paleta de colores basada en el rosado #f36ca4 y bordes negros definidos para darle un estilo moderno y juvenil.

 Estructura de Archivos
Plaintext
src/
├── components/
│   ├── Content.js      // Home y Más Vendidos
│   ├── Articles.js     // Tienda Principal
│   ├── MyCart.js       // Carrito de compras
│   ├── Myfavorites.js  // Lista de deseos
│   └── MyBuys.js       // Historial de pedidos
├── App.js              // Configuración de rutas
└── index.js            // Punto de entrada