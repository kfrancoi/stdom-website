#!/usr/bin/env bash
# Publie les modifications faites dans Keystatic : commit + push vers GitHub
# (ce qui déclenche le build Vercel), et récupère les changements poussés
# par ailleurs (développeurs).
#
# Un commit n'est créé que si les fichiers n'ont plus bougé depuis le tour
# précédent : une série de sauvegardes rapprochées donne un seul déploiement
# (le plan gratuit de Vercel est limité à 100 déploiements par jour).
set -u
cd "${APP_DIR:?}"

INTERVAL="${SYNC_INTERVAL:-60}"
CONTENT_PATHS=(src/content public/images)
last=""

while true; do
  sleep "$INTERVAL"
  current="$(git status --porcelain -- "${CONTENT_PATHS[@]}")"

  if [ -z "$current" ]; then
    last=""
    git pull --rebase --quiet || { git rebase --abort 2>/dev/null; echo "[sync] pull impossible"; }
    continue
  fi

  # Modifications encore en cours : on attend le prochain tour.
  if [ "$current" != "$last" ]; then
    last="$current"
    continue
  fi

  git add -- "${CONTENT_PATHS[@]}"
  git commit --quiet -m "Mise à jour du contenu via l'éditeur"
  if git pull --rebase --quiet && git push --quiet; then
    echo "[sync] modifications publiées"
    last=""
  else
    git rebase --abort 2>/dev/null
    echo "[sync] échec du push, nouvelle tentative au prochain tour"
  fi
done
