# Duo Service J&N SAS — sitio web

## Cómo desplegarlo (sin build, sin dependencias)
Es HTML/CSS/JS puro. Para publicarlo, sube toda esta carpeta tal cual a cualquiera de estas opciones gratuitas:

- **Netlify**: arrastra la carpeta a https://app.netlify.com/drop
- **Vercel**: `vercel deploy` desde esta carpeta (usando su CLI)
- **GitHub Pages**: sube el contenido a un repo y activa Pages en la rama principal
- **Hosting tradicional (cPanel, etc.)**: sube todo el contenido de esta carpeta a `public_html`

No requiere Node, build, ni instalación de paquetes. Basta con abrir `index.html` en un navegador para probarlo localmente.

## Antes de publicar, revisa esto
1. **WhatsApp**: el sitio usa un solo número en todos los botones: `573123842133` (+57 312 384 2133).
   El HTML original tenía dos números distintos — confirma cuál es el correcto.
   Para cambiarlo, busca y reemplaza `573123842133` en `index.html` (aparece en ~15 lugares).
2. **Correo**: `duoservicejn@outlook.com` (footer y sección de contacto).
3. **Mapa**: no se incluyó un mapa embebido porque no había una dirección exacta. Si quieren mostrar su
   ubicación, se puede agregar un iframe de Google Maps en la sección de contacto.
4. **Favicon**: se usa el logo actual como ícono de pestaña; si tienen una versión cuadrada del logo,
   se verá mejor que el recorte automático.

## Estructura
```
index.html
css/style.css
js/script.js
img/            (imágenes renombradas sin espacios ni tildes)
```
