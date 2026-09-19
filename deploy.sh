#!/bin/bash
# deploy.sh — Script de déploiement sur le VPS OVH
# Usage : ./deploy.sh [user@host]
#
# Prérequis côté serveur :
#   - Node.js 18+ installé
#   - Nginx installé et configuré (voir nginx.conf)
#   - Dossier /var/www/stdom/ existant et accessible
#   - rsync installé

set -e

SERVER="${1:-deploy@stdom.be}"
REMOTE_DIR="/var/www/stdom"

echo "🔨 Build du site..."
npm run build

echo "📦 Envoi vers $SERVER:$REMOTE_DIR/dist ..."
rsync -avz --delete dist/ "$SERVER:$REMOTE_DIR/dist/"

echo "✅ Déploiement terminé ! Le site est disponible sur https://stdom.be"
