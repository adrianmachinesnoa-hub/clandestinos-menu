# Clandestinos Bar Café — Menú Digital

Este paquete contiene una primera versión del menú digital para Clandestinos Bar Café.

## Qué hace

- Diseño móvil pensado para abrir desde un código QR.
- No incluye pagos, carrito ni cobros.
- Permite mostrar cada producto como **Disponible** o **Agotado**.
- Los datos del menú están separados del diseño.
- Está preparado para editarse con **Pages CMS** sobre GitHub.
- El sitio puede publicarse gratuitamente con **GitHub Pages**.

## Estructura

- `index.html` → página pública.
- `styles.css` → diseño.
- `app.js` → funcionamiento.
- `data/site.json` → nombre, frase, horarios, enlaces, categorías y opciones generales.
- `data/picaderas.json` → picaderas.
- `data/cafes.json` → cafés.
- `data/bebidas-cervezas.json` → bebidas y cervezas.
- `data/cocteleria-postres.json` → coctelería y postres.
- `.pages.yml` → configura el editor visual de Pages CMS.
- `assets/logo.jpg` → logo recibido.

## Publicación gratuita

1. Crear una cuenta de GitHub.
2. Crear un repositorio **público** llamado, por ejemplo, `clandestinos-menu`.
3. Subir TODO el contenido de esta carpeta al repositorio.
4. En GitHub: `Settings → Pages`.
5. Seleccionar la rama `main` y la carpeta `/ (root)`.
6. GitHub generará una dirección tipo:

   `https://TUUSUARIO.github.io/clandestinos-menu/`

## Edición sin tocar el código

1. Ir a `https://app.pagescms.org/`.
2. Entrar con la cuenta de GitHub que tiene el repositorio.
3. Instalar/autorizar Pages CMS para ese repositorio.
4. Abrir el repositorio de Clandestinos.
5. Editar:
   - **Datos generales** → horarios, enlaces, frase, categorías, etc.
   - **Picaderas**
   - **Cafés**
   - **Bebidas & Cervezas**
   - **Coctelería y Postres**
6. En cada producto, la opción **Disponible** controla si aparece como `Disponible` o `Agotado`.
7. Los cambios se guardan en GitHub y el sitio público se actualiza después de la publicación.

## Seguridad / acceso de edición

El público solo verá `index.html`.
La edición se hace desde GitHub + Pages CMS. Para mantenerlo bajo tu control, no añadas colaboradores al repositorio que no deban editarlo.

## Código QR

No genero todavía el QR final porque la URL pública depende de tu usuario de GitHub. Una vez publicada la página, usa EXACTAMENTE la URL final para crear el QR.

## Nota importante

Los textos del menú se cargaron a partir del documento suministrado. La frase se conserva tal como aparece en ese documento:
`¡La clandestinidad es la única patriot posible!`
