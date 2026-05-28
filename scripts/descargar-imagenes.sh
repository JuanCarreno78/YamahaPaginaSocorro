#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  descargar-imagenes.sh — Descarga y optimiza imágenes de motos
#  Yamaha Motos del Socorro
#
#  Requisitos: curl, ImageMagick (convert)
#  Uso: chmod +x scripts/descargar-imagenes.sh && ./scripts/descargar-imagenes.sh
# ═══════════════════════════════════════════════════════════════════

set -e

BASE="public/images/motos"
CDN="https://www.incolmotos-yamaha.com.co/wp-content/uploads"

# Colores para output
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

info()    { echo -e "${GREEN}✅ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "${RED}❌ $1${NC}"; }

# Verificar dependencias
command -v curl    >/dev/null 2>&1 || { error "curl no encontrado. Instala curl."; exit 1; }
command -v convert >/dev/null 2>&1 || { error "ImageMagick no encontrado. Instala con: sudo apt install imagemagick"; exit 1; }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Yamaha Motos del Socorro — Descarga de imágenes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Función: descargar + redimensionar + guardar como JPG
descargar() {
  local slug="$1"
  local url="$2"
  local filename="$3"
  local width="${4:-800}"
  local height="${5:-533}"

  local dest="$BASE/$slug/$filename"
  local tmp="/tmp/yamaha_${slug}_tmp.img"

  echo "  ⬇  Descargando $slug..."

  if curl -sL --max-time 30 -A "Mozilla/5.0" "$url" -o "$tmp"; then
    # Redimensionar con ImageMagick (crop centrado al ratio exacto)
    if convert "$tmp" -resize "${width}x${height}^" -gravity center -extent "${width}x${height}" \
       -quality 88 "$dest" 2>/dev/null; then
      info "Guardado: $dest (${width}x${height})"
    else
      warning "Error al procesar $slug. Copiando sin redimensionar."
      cp "$tmp" "$dest"
    fi
    rm -f "$tmp"
  else
    error "No se pudo descargar: $slug"
  fi
}

# ── Imágenes de producto (cards + detalle) — 800×533 ────────────────
descargar "mt-15-v2"  "$CDN/2023/04/Key-banner-MT15.jpg"                     "principal.jpg" 800 533
descargar "mt-15-v2"  "$CDN/2023/04/mt15_azul_mini.png"                       "galeria-1.jpg" 800 533

descargar "r15-v4"    "$CDN/2024/11/Yamaha_r15v4_2026_menumini.jpg"            "principal.jpg" 800 533

descargar "fz-3-0"    "$CDN/2024/02/Fz15v3_2024_mini.png"                     "principal.jpg" 800 533

descargar "nmax-155"  "$CDN/2021/03/nmax_plata_2026_mini.png"                  "principal.jpg" 800 533

descargar "aerox-155" "$CDN/2023/09/aeroxNeon_mini.jpg"                        "principal.jpg" 800 533

descargar "crypton-fi" "$CDN/2025/10/crypton_2026_verde_mini.png"              "principal.jpg" 800 533

descargar "xtz-150"   "$CDN/2019/09/xtz150_azul-ABS_mini.png"                 "principal.jpg" 800 533

# ── Imagen Hero (1920×1080) ─────────────────────────────────────────
descargar "mt-15-v2"  "$CDN/2023/04/Key-banner-MT15.jpg"                       "hero.jpg" 1920 1080

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
info "Proceso completado. Revisa las imágenes en $BASE/"
echo ""
echo "  Siguiente paso: actualiza src/data/motos.js"
echo "  cambiando las URLs externas por rutas locales:"
echo "  imagen: '/images/motos/mt-15-v2/principal.jpg'"
echo ""
