# Serveur d'édition Keystatic (mode local). Deux modes d'accès :
# - tunnel Cloudflare protégé par Cloudflare Access (si TUNNEL_TOKEN est défini) ;
# - sinon mot de passe (basic auth Caddy) sur le domaine public de Railway.
# Le code du site n'est pas copié dans l'image : entrypoint.sh le clone depuis
# GitHub dans /data, ce qui permet de garder les modifications non
# publiées si le conteneur redémarre.
FROM node:22-bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends git openssh-client ca-certificates bash \
 && rm -rf /var/lib/apt/lists/*

COPY --from=caddy:2 /usr/bin/caddy /usr/bin/caddy
COPY --from=cloudflare/cloudflared:latest /usr/local/bin/cloudflared /usr/local/bin/cloudflared
COPY editor/entrypoint.sh editor/sync.sh /opt/editor/
RUN chmod +x /opt/editor/*.sh

ENV ASTRO_TELEMETRY_DISABLED=1
# /data doit être un volume persistant, monté par l'hébergeur (Railway refuse
# l'instruction VOLUME dans le Dockerfile).
CMD ["/opt/editor/entrypoint.sh"]
