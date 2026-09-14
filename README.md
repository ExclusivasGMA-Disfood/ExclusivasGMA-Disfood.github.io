# GMA product images — GitHub-ready package

This package was built from `TARIFA(1).pdf` and `redimensionadas.zip`.

## Source of truth

- Final references: **1001**
- References with a selected product image: **540**
- References currently without a matching image: **461**
- References with more than one distinct candidate image: **74**

References are strings. Leading zeros are significant: `065` must never be converted to `65`.

## Daily workflow from iPhone

1. Name a photo with the exact product reference, e.g. `065.jpg`.
2. Upload it to `images/products/` in GitHub.
3. GitHub Actions rebuilds `data/images-manifest.json` automatically.
4. The HTML should load the manifest once and use the exact reference as the lookup key.

## Important files

- `data/references.json`: the 1001 valid final product references from the tariff.
- `data/images-manifest.json`: reference -> selected image path.
- `data/missing-images.txt`: products that still need a photo.
- `data/review-multiple-images.txt`: products where several genuinely different photos exist; one was selected automatically but should be reviewed if desired.
- `data/images-audit.json`: full audit trail.

## Rule

Do not upload obsolete product photos to `images/products/`. The manifest builder ignores filenames whose exact reference is not present in `data/references.json`.
