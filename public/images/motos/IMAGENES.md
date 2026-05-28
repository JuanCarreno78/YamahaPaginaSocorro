# Imágenes de motos — Yamaha Motos del Socorro

## Estructura de carpetas

Cada modelo tiene su propia carpeta:

```
public/images/motos/
├── r15-v4/
│   ├── principal.webp   ← imagen principal (800×533px, ratio 3:2)
│   └── galeria-1.webp   ← imágenes adicionales para la ficha
├── mt-15-v2/
├── fz-3-0/
├── nmax-155/
├── aerox-155/
├── crypton-fi/
├── xtz-150/
└── r3/
```

## Cómo agregar imágenes reales

1. Descarga la imagen oficial del modelo desde el sitio de Yamaha Colombia
   o usa una fotografía propia del concesionario.

2. Redimensiona a **800×533px** (proporción 3:2) para las cards del catálogo.
   Usa Squoosh (https://squoosh.app) o ImageMagick:
   ```bash
   convert imagen-original.jpg -resize 800x533^ -gravity center -extent 800x533 principal.webp
   ```

3. Para el Hero de la Home usa **1920×1080px** (proporción 16:9).

4. Guarda en formato **WebP** para mejor compresión.
   Si no puedes WebP, usa JPG con calidad 85%.

5. Nombra los archivos como:
   - `principal.webp` — imagen principal de la card y detalle
   - `galeria-1.webp`, `galeria-2.webp` — imágenes adicionales

6. Una vez que los archivos estén en su lugar, actualiza las rutas en
   `src/data/motos.js` de:
   ```js
   // URL externa (temporal)
   imagen: "https://www.incolmotos-yamaha.com.co/..."
   ```
   a:
   ```js
   // Imagen local (definitivo)
   imagen: "/images/motos/mt-15-v2/principal.webp"
   ```

## Script de descarga automática

Ejecuta el script incluido para descargar y procesar las imágenes:

```bash
chmod +x scripts/descargar-imagenes.sh
./scripts/descargar-imagenes.sh
```

## Formatos recomendados

| Uso         | Formato | Tamaño   | Calidad |
|-------------|---------|----------|---------|
| Cards       | WebP    | 800×533  | 85%     |
| Detalle     | WebP    | 1200×800 | 90%     |
| Hero        | WebP    | 1920×1080| 80%     |
| Galería     | WebP    | 800×533  | 85%     |
