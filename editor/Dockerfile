# Serveur d'édition Keystatic (mode local). Deux modes d'accès :
# - tunnel Cloudflare protégé par Cloudflare Access (si TUNNEL_TOKEN est défini) ;
# - sinon mot de passe (basic auth Caddy) sur le domaine public de Railway.
# Seules les dépendances sont dans l'image : entrypoint.sh clone le site depuis
# GitHub dans /data, ce qui permet de garder les modifications non publiées si
# le conteneur redémarre.
FROM node:22-bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends git openssh-client ca-certificates bash \
 && rm -rf /var/lib/apt/lists/*

COPY --from=caddy:2 /usr/bin/caddy /usr/bin/caddy
COPY --from=cloudflare/cloudflared:latest /usr/local/bin/cloudflared /usr/local/bin/cloudflared

# Dépendances installées dans l'image, pas dans le volume : le volume ne garde
# que le dépôt (quelques dizaines de Mo) et un redémarrage reste rapide.
WORKDIR /opt/deps
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
ENV EDITOR_DEPS_DIR=/opt/deps

COPY editor/entrypoint.sh editor/sync.sh /opt/editor/
RUN chmod +x /opt/editor/*.sh

ENV ASTRO_TELEMETRY_DISABLED=1
# /data doit être un volume persistant, monté par l'hébergeur (Railway refuse
# l'instruction VOLUME dans le Dockerfile).
CMD ["/opt/editor/entrypoint.sh"]
