#!/usr/bin/env bash
set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
IMG_DIR="$BASE/public/images"
FONT_DIR="$BASE/public/fonts"

mkdir -p "$IMG_DIR" "$FONT_DIR"

echo "→ Downloading images..."
for i in 1 2 3 4 5; do
  curl -sL -o "$IMG_DIR/mission-$i.jpg" \
    "https://synoptic-amo.fr/wp-content/uploads/2025/09/Mission-$i.jpg" && echo "  mission-$i.jpg ✓"
done
curl -sL -o "$IMG_DIR/photo-gilles.jpg" \
  "https://synoptic-amo.fr/wp-content/uploads/2025/12/Photo-Gilles-1024x1024.png" && echo "  photo-gilles.jpg ✓"
curl -sL -o "$IMG_DIR/photo-marion.jpg" \
  "https://synoptic-amo.fr/wp-content/uploads/2025/12/Photo-Marion-1024x1024.png" && echo "  photo-marion.jpg ✓"
curl -sL -o "$IMG_DIR/logo.png" \
  "https://synoptic-amo.fr/wp-content/uploads/2025/09/SYNOPTIC-AMO-Logo-Horizontal.png" && echo "  logo.png ✓"
curl -sL -o "$IMG_DIR/image001.jpg" \
  "https://synoptic-amo.fr/wp-content/uploads/2025/09/image001.jpg" && echo "  image001.jpg ✓"
curl -sL -o "$IMG_DIR/image002.jpg" \
  "https://synoptic-amo.fr/wp-content/uploads/2025/09/image002.jpg" && echo "  image002.jpg ✓"

echo ""
echo "→ Downloading Aptos font..."
# Aptos is Microsoft's free font released with Office 2023+.
# Download TTF files from GitHub release mirror:
APTOS_BASE="https://github.com/nicowillis/aptos/raw/main"
for variant in "Aptos" "Aptos-Bold" "Aptos-SemiBold"; do
  if curl -sL --fail -o "$FONT_DIR/${variant}.ttf" "$APTOS_BASE/${variant}.ttf" 2>/dev/null; then
    echo "  ${variant}.ttf ✓"
  else
    echo "  ${variant}.ttf ✗ (place manually in public/fonts/)"
  fi
done

echo ""
echo "Done. Assets are in:"
echo "  $IMG_DIR"
echo "  $FONT_DIR"
