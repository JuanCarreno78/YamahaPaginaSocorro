# Estructura de imágenes — Yamaha Motos del Socorro

## Cómo agregar imágenes de los modelos

Cada moto tiene su propia carpeta dentro de `public/images/motos/`.
Nombra los archivos exactamente como se indica abajo para que
el frontend los detecte automáticamente.

```
public/images/
├── motos/
│   ├── mt-15-v2/
│   │   ├── banner.jpg        ← Banner superior (1920×600 px, ratio ~3:1)
│   │   ├── principal.jpg     ← Tarjeta del catálogo  (800×533 px, ratio 3:2)
│   │   ├── galeria-1.jpg     ← Galería — foto 1      (800×533 px)
│   │   └── galeria-2.jpg     ← Galería — foto 2      (800×533 px)
│   ├── r15-v4/
│   ├── fz-3-0/
│   ├── nmax-155/
│   ├── aerox-155/
│   ├── crypton-finn/
│   ├── fz25-abs/
│   ├── mt-03/
│   ├── xtz-150/
│   └── xtz250/
│
└── tecnologias/
    ├── blue-core.png         ← Ícono/logo oficial Blue Core
    ├── abs.png               ← Ícono ABS
    ├── fi.png                ← Ícono Fuel Injection
    ├── vva.png               ← Ícono VVA
    ├── full-led.png          ← Ícono Full LED
    ├── y-connect.png         ← Ícono Y-Connect
    └── smart-key.png         ← Ícono Smart Key
```

## Formatos recomendados

| Uso           | Formato | Tamaño        | Peso máx. |
|---------------|---------|---------------|-----------|
| Banner        | WebP/JPG| 1920 × 600 px | 300 KB    |
| Catálogo card | WebP/JPG| 800 × 533 px  | 120 KB    |
| Galería       | WebP/JPG| 800 × 533 px  | 120 KB    |
| Íconos tech   | PNG/SVG | 128 × 128 px  | 20 KB     |

## Pasos para subir tus fotos

1. Copia las imágenes de tu carpeta "Recursos Yamaha" a la carpeta
   correspondiente de cada moto en `public/images/motos/`.
2. Renómbralas: `banner.jpg`, `principal.jpg`, `galeria-1.jpg`, etc.
3. Reinicia el servidor de desarrollo (`npm run dev`) y recarga la página.
4. Las imágenes aparecerán automáticamente sin cambiar código.

## Nota sobre íconos de tecnología

Si tienes los logos oficiales de Yamaha (Blue Core, ABS, etc.),
cópialos en `public/images/tecnologias/` con los nombres indicados.
El frontend los mostrará en la franja de tecnologías de cada moto.
Si no existen los archivos, se muestran los íconos SVG incorporados.
