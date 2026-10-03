# Serveur d'édition (Keystatic en mode local)

Alternative à Keystatic Cloud : pas de limite à 3 éditeurs, pas de compte GitHub pour les chefs.

```
Chef ──▶ accès protégé ──▶ astro dev (Keystatic, stockage local)
                                │ fichiers modifiés
                                ▼
           sync.sh : commit + push (clé de déploiement)
                                │
                                ▼
                     GitHub ──▶ Vercel (build)
```

Le site public reste sur Vercel. Ce service ne sert qu'à l'édition.

Deux modes d'accès, choisis selon les variables définies :

| Mode | Variable | Usage |
|---|---|---|
| **Mot de passe** (basic auth) | `EDITOR_USERS` | Transitoire, avant la mise en ligne sur `stdom.be`. Domaine public Railway (`*.up.railway.app`). |
| **Cloudflare Access** | `TUNNEL_TOKEN` | Cible. Connexion par email + code, aucune adresse publique. Prioritaire si les deux sont définis. |

## 1. Clé de déploiement GitHub (publication des modifications)

Une clé limitée à ce dépôt, indépendante de ton compte personnel et sans date d'expiration.

```sh
ssh-keygen -t ed25519 -N "" -C "editeur-stdom" -f /tmp/editeur_key
```

1. GitHub → dépôt `stdom-website` → Settings → Deploy keys → Add deploy key.
2. Coller le contenu de `/tmp/editeur_key.pub`, **cocher « Allow write access »**.
3. Encoder la clé privée pour la variable d'environnement, puis supprimer les fichiers :
   ```sh
   base64 < /tmp/editeur_key | tr -d '\n' | pbcopy   # → valeur de GIT_DEPLOY_KEY
   rm /tmp/editeur_key /tmp/editeur_key.pub
   ```
4. Si `main` a une protection de branche, autoriser les clés de déploiement à pousser.

## 2. Déploiement sur Railway (mode mot de passe)

1. Railway → New Project → Deploy from GitHub repo → ce dépôt.
2. Settings du service :
   - **Branch** : la branche qui contient `editor/` (`main` une fois fusionnée).
   - **Watch Paths** : `editor/**`. Indispensable : sans ça, chaque commit de contenu poussé par l'éditeur sur `main` relance un déploiement Railway et redémarre l'éditeur.
3. Variables :

   | Variable | Valeur |
   |---|---|
   | `RAILWAY_DOCKERFILE_PATH` | `editor/Dockerfile` |
   | `GIT_DEPLOY_KEY` | clé privée en base64 (étape 1) |
   | `EDITOR_USERS` | `marie:motdepasse1,paul:motdepasse2` (un couple par éditeur, sans virgule ni `:` dans le mot de passe) |
   | `GITHUB_REPO` | optionnel, `kfrancoi/stdom-website` par défaut |
   | `SYNC_INTERVAL` | optionnel, 60 secondes par défaut |
   | `GIT_AUTHOR_EMAIL` | optionnel, adresse « noreply » GitHub de `kfrancoi` par défaut. Vercel (plan Hobby) refuse de déployer un commit dont l'email n'est pas rattaché au compte GitHub propriétaire : à changer si le dépôt change de propriétaire |

4. Ajouter un **volume** monté sur `/data`.
5. Settings → Networking → **Generate Domain** (port `8080`). L'admin est sur `https://<nom>.up.railway.app/keystatic`.
6. Ajouter ou retirer un éditeur : modifier `EDITOR_USERS` ; Railway redémarre le service.

## 3. Passage à Cloudflare Access (à la mise en ligne sur `stdom.be`)

### DNS

Cloudflare Access ne protège que des noms d'hôte dont le DNS est géré par Cloudflare. Au moment de brancher `stdom.be` :

1. Cloudflare → Add a domain → `stdom.be` → plan Free.
2. Comparer les enregistrements importés avec la zone OVH, en particulier MX et TXT (mails), Vercel et `*.stdom.be` (sous-domaines des sections). Mettre ceux de Vercel en « DNS only » (nuage gris).
3. Chez OVH, remplacer les serveurs de noms par ceux donnés par Cloudflare.
4. Attendre que Cloudflare affiche le domaine « Active », puis vérifier que les mails arrivent toujours.

### Tunnel

1. Zero Trust (plan Free) → Networks → Tunnels → Create a tunnel → Cloudflared → `stdom-editeur`. Copier le **token** (la chaîne après `--token`).
2. Public hostname : `edition.stdom.be` → Service `HTTP` `localhost:4321`. Dans *Additional application settings → HTTP Settings*, mettre **HTTP Host Header** à `localhost:4321` (Vite refuse les noms d'hôte inconnus).

### Access

À faire **avant** de démarrer le tunnel, pour que l'éditeur ne soit jamais joignable sans connexion.

1. Zero Trust → Settings → Authentication : vérifier que **One-time PIN** est activé.
2. Access → Applications → Add → Self-hosted, domaine `edition.stdom.be`, durée de session 1 semaine.
3. Policy *Allow* « Chefs » : Include → Emails → liste des chefs.
4. Le plan gratuit couvre jusqu'à 50 utilisateurs (à vérifier sur la page de tarifs Cloudflare).

### Bascule sur Railway

1. Ajouter la variable `TUNNEL_TOKEN`, supprimer `EDITOR_USERS`.
2. Settings → Networking : **supprimer le domaine public** Railway (sinon l'éditeur reste joignable en contournant Access).
3. Vérifier dans Cloudflare que le tunnel est *Healthy*, puis tester `https://edition.stdom.be/keystatic` avec un email autorisé et un email non autorisé.

## Vérifier que tout fonctionne

Modifier une info flash et sauvegarder. Dans les 1 à 2 minutes :

- logs Railway : `[sync] modifications publiées` ;
- GitHub : un commit « Mise à jour du contenu via l'éditeur » par « Éditeurs Saint-Dom » ;
- Vercel : un nouveau déploiement, puis la modification en ligne.

## Dépannage

- **« Blocked request » / « Invalid host »** (mode Cloudflare) : le réglage *HTTP Host Header* du tunnel manque.
- **Tunnel *Inactive*** : vérifier `TUNNEL_TOKEN` et les logs Railway.
- **Échec du push** : la clé de déploiement n'a pas l'accès en écriture, ou une protection de branche bloque.
- **Vercel bloque le déploiement (« commit author email is not valid »)** : voir `GIT_AUTHOR_EMAIL`.
- **Clone impossible (`port 22: Connection timed out`)** : Railway bloque le port 22 ; le conteneur passe par `ssh.github.com:443`, vérifier que `~/.ssh/config` est bien généré.
- **502 au premier démarrage** : normal pendant le clone et `npm ci` (quelques minutes) ; Caddy démarre ensuite.

## À savoir

- **Conflits** : si un développeur pousse du code, le serveur le récupère automatiquement. En cas de conflit sur un même fichier, le push échoue et se réessaie ; en dernier recours, supprimer le volume et redéployer repart d'une copie propre (les modifications non publiées sont perdues).
- **Changement de dépendances** (`package.json`) : redéployer le service pour relancer `npm ci`.
- **Sécurité** : le serveur de dev expose aussi le code source à qui est connecté ; n'autoriser que des personnes de confiance. La clé de déploiement, le jeton du tunnel et les mots de passe sont des secrets : à garder uniquement dans les variables Railway.
- **Pas d'attribution** : tous les commits portent le même auteur. (En mode Cloudflare, Access journalise qui s'est connecté.)
- **Admin Vercel** : `/keystatic` sur le site Vercel (mode cloud) reste accessible tant que la config n'est pas changée ; on peut le désactiver une fois ce serveur adopté.
