# El Diccionario de María Teresa Yáñez Norambuena - LA TERE

Un sitio web familiar con las frases, dichos y expresiones características de La Tere: un pequeño homenaje que reúne su humor y su forma única de hablar.

## Ver el sitio

Es un sitio estático (HTML, CSS y JavaScript puro, sin instalación ni dependencias). Para verlo en tu computador:

1. Descarga o clona este repositorio.
2. Abre `index.html` directamente en el navegador, **o** levanta un servidor local (recomendado para que las imágenes carguen sin problemas):
   ```bash
   python3 -m http.server 8000
   ```
   y entra a `http://localhost:8000` en tu navegador.

## Estructura

```
index.html      → estructura de la página
css/style.css   → estilos (tema oscuro con detalles dorados)
js/data.js      → todas las frases y sus significados
js/script.js    → lógica: frase del día, tarjetas y fondo aleatorio
img/            → fotos de La Tere (tere1.jpg ... tere25.jpg)
```

## Cómo agregar una frase nueva

Abre `js/data.js` y agrega un objeto al final del arreglo `phrases`, con un `id` correlativo:

```js
{ id: 207, text: "La frase tal cual la decía", meaning: "Qué significaba o en qué contexto la usaba." },
```

No hace falta tocar ningún otro archivo: la frase aparecerá automáticamente en el frasario y podrá salir como "frase del día".

## Cómo agregar una foto nueva

1. Agrega el archivo a la carpeta `img/` siguiendo el patrón `tereN.jpg`, donde `N` es el siguiente número disponible (por ejemplo, si la última es `tere25.jpg`, la nueva sería `tere26.jpg`).
2. Abre `js/script.js` y actualiza la constante `TOTAL_PHOTOS` al inicio del archivo con el nuevo total de fotos.

## Notas

- La "frase del día" es la misma para todas las visitas durante el mismo día (se elige según la fecha), y cambia automáticamente al día siguiente.
- Cada tarjeta del frasario se puede voltear haciendo clic, o con el teclado (Tab para enfocar, Enter o Espacio para voltear).
- El botón "Compartir un recuerdo" abre un correo a `profepablo2010@gmail.com`.

Con todo nuestro amor y admiración. 🤍
