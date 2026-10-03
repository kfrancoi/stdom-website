#!/usr/bin/env bash
# Démarre : Astro en mode dev (Keystatic en stockage local), la boucle de
# synchronisation vers GitHub, et l'accès protégé :
# - TUNNEL_TOKEN défini : tunnel Cloudflare (contrôle par Cloudflare Access),
#   aucun port public ;
# - sinon : Caddy avec mot de passe (EDITOR_USERS) sur $PORT, pour le domaine
#   public de Railway. Mode transitoire en attendant Cloudflare.
set -euo pipefail

: "${GIT_DEPLOY_KEY:?GIT_DEPLOY_KEY manquant (clé privée SSH encodée en base64)}"
if [ -z "${TUNNEL_TOKEN:-}" ] && [ -z "${EDITOR_USERS:-}" ]; then
  echo "Définir TUNNEL_TOKEN (Cloudflare Access) ou EDITOR_USERS (mot de passe)." >&2
  exit 1
fi

GITHUB_REPO="${GITHUB_REPO:-kfrancoi/stdom-website}"
export APP_DIR=/data/site

# ── Accès à GitHub (clé de déploiement) ─────────────────────────────────────
mkdir -p ~/.ssh
echo "$GIT_DEPLOY_KEY" | base64 -d > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key
# Railway bloque le port 22 en sortie : GitHub accepte aussi SSH sur le port
# 443, via ssh.github.com.
cat > ~/.ssh/config <<EOF
Host github.com
  HostName ssh.github.com
  Port 443
  User git
  IdentityFile $HOME/.ssh/deploy_key
  IdentitiesOnly yes
  StrictHostKeyChecking accept-new
EOF
chmod 600 ~/.ssh/config

# ── Dépôt ───────────────────────────────────────────────────────────────────
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "git@github.com:${GITHUB_REPO}.git" "$APP_DIR"
fi
cd "$APP_DIR"
git config user.name "Éditeurs Saint-Dom"
git config user.email "editeurs@stdom.be"
git pull --rebase --autostash || echo "pull initial impossible, on continue avec la copie locale"
npm ci

# ── Processus ───────────────────────────────────────────────────────────────
npx astro dev --host 127.0.0.1 --port 4321 &
/opt/editor/sync.sh &

if [ -n "${TUNNEL_TOKEN:-}" ]; then
  echo "Accès : tunnel Cloudflare (Cloudflare Access)"
  cloudflared tunnel --no-autoupdate run --token "$TUNNEL_TOKEN" &
else
  echo "Accès : mot de passe (basic auth) sur le port ${PORT:-8080}"
  {
    echo "{"
    echo "  auto_https off"
    echo "  admin off"
    echo "}"
    echo ":${PORT:-8080} {"
    echo "  basic_auth {"
    echo "$EDITOR_USERS" | tr ',' '\n' | while IFS=: read -r user pass; do
      if [ -n "$user" ] && [ -n "$pass" ]; then
        echo "    $user $(caddy hash-password --plaintext "$pass")"
      fi
    done
    echo "  }"
    # Vite refuse les noms d'hôte inconnus : on lui présente localhost.
    echo "  reverse_proxy 127.0.0.1:4321 {"
    echo "    header_up Host localhost:4321"
    echo "  }"
    echo "}"
  } > /tmp/Caddyfile
  caddy run --config /tmp/Caddyfile --adapter caddyfile &
fi

# Si l'un des processus s'arrête, on quitte pour que Railway redémarre le service.
wait -n
echo "Un processus s'est arrêté, redémarrage du conteneur."
exit 1
