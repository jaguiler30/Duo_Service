# Duo Service J&N SAS — sitio web

## Cómo desplegarlo (sin build, sin dependencias)
Es HTML/CSS/JS puro. Para publicarlo, sube toda esta carpeta tal cual a cualquiera de estas opciones gratuitas:

- **Netlify**: arrastra la carpeta a https://app.netlify.com/drop
- **Vercel**: `vercel deploy` desde esta carpeta (usando su CLI)
- **GitHub Pages**: sube el contenido a un repo y activa Pages en la rama principal
- **Hosting tradicional (cPanel, etc.)**: sube todo el contenido de esta carpeta a `public_html`

No requiere Node, build, ni instalación de paquetes. Basta con abrir `index.html` en un navegador para probarlo localmente.

## Cambios aplicados según "Ajustes pagina Web.docx" (8 oct 2026)
- Logo del encabezado agrandado.
- Hero: nuevo título, subtítulo y 4 fotos (con mayor presencia de marca).
- 12 → **11 tarjetas de servicio**: se eliminó "Fumigación Residencial" (quedó integrada en
  "Fumigación de Vectores"), se renombraron, se les cambió la descripción, el texto del botón
  ("Cotizar Servicio" / "Cotizar Insumos" / "Solicitar Cotización" según el caso) y la imagen en
  9 de las 11 tarjetas, usando las fotos nuevas que venían en el documento.
- "Fumigación de Vectores" y "Lavado y Desinfección de Tanques" ahora tienen una lista de
  características con íconos, tal como se pidió.
- Sección "Nosotros" reescrita por completo con el contenido enviado: Quiénes Somos, Misión,
  Visión y los 6 Objetivos Estratégicos.
- Se limpiaron las 10 imágenes antiguas que quedaron sin uso.

## Antes de publicar, revisa esto
1. **WhatsApp**: el sitio usa un solo número en todos los botones: `573123842133` (+57 312 384 2133).
   Para cambiarlo, busca y reemplaza `573123842133` en `index.html` (aparece en ~15 lugares).
2. **Correo**: `duoservicejn@outlook.com` (footer y sección de contacto).
3. **Galería del hero**: el documento no incluía fotos específicas para esa galería (solo pedía
   "colocarlo más grande" y "cambiar estas imágenes" sin adjuntar reemplazo), así que se usaron
   4 de las fotos nuevas con mejor presencia de marca. Si quieren otras fotos ahí, son fáciles de
   cambiar en `index.html` (sección `hero__gallery`).
4. **Suministros e Insumos de Aseo**: el documento no decía explícitamente "cambiar imagen" para
   esta tarjeta, pero traía una foto nueva justo en ese lugar del documento, así que se usó. Avisen
   si prefieren mantener la foto anterior.
5. **Mapa**: no se incluyó un mapa embebido porque no había una dirección exacta.
6. **Favicon**: se usa el logo actual como ícono de pestaña.

## Estructura
```
index.html
css/style.css
js/script.js
img/            (imágenes renombradas sin espacios ni tildes)
```

## Cambios de la ronda "cambiamos_pagina_web.pdf"
- Hero: la primera imagen ahora es la foto completa del Todero (ancho completo) con 3 fotos debajo.
- SRV-04 Fumigación de Vectores: foto real en lugar de la ilustración.
- Tarjetas de servicio: las fotos llenan todo el recuadro (SRV-07, 08, 09, 11 incluidas; SRV-11 con la foto limpia de adoquines). Al tocar una foto se abre COMPLETA (visor).
- Botón "Ver más / Ver menos": las tarjetas quedan compactas y del mismo alto; al expandir se ve la descripción completa y la lista.
- Sin JavaScript todo se muestra completo (mejora progresiva).
- Pendiente de fotos de mayor calidad: Fumigación (477×637 px) y Control de Roedores (309×163 px) se ven algo suaves.

## Ajuste de imágenes (ronda 2)
- Todas las fotos (tarjetas e inicio) se muestran COMPLETAS (object-fit: contain) sobre un fondo difuminado de la misma foto, sin franjas vacías ni recortes.
- Las tarjetas usan formato 5:4 y se estiran al mismo alto por fila.
- Inicio: galería en mosaico original (4 fotos que llenan su recuadro, sin franjas).
- Nuevas fotos: Suministros e Insumos (SRV-02) y Mantenimiento de Adoquines (SRV-11, también en el inicio).

## SEO y legal (antes de subir)
Archivos nuevos: robots.txt, sitemap.xml, favicon.ico, img/favicon-32.png, img/apple-touch-icon.png, img/og-image.jpg (1200x630), privacidad.html, 404.html. En index.html: canonical, Open Graph/Twitter y datos estructurados (LocalBusiness).

**IMPORTANTE – reemplazar el dominio:** en index.html, robots.txt y sitemap.xml aparece `https://TU-DOMINIO.com`. Cámbialo por el dominio real (buscar y reemplazar en toda la carpeta). Si primero publicas en github.io, usa esa URL.
**Completar el NIT** en privacidad.html (busca `[COMPLETAR NIT]`) y pídele al cliente que revise el texto legal.
