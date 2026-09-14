# Site web — Jesus Family Kingdom (JFK)

Site vitrine et de levée de fonds pour Jesus Family Kingdom, œuvre chrétienne missionnaire à Madagascar. Bilingue français / anglais, construit avec [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), pensé pour être hébergé gratuitement sur **Cloudflare Pages**.

## Sommaire

1. [Stack technique](#1-stack-technique)
2. [Lancer le site en local](#2-lancer-le-site-en-local)
3. [Déployer sur GitHub + Cloudflare Pages](#3-déployer-sur-github--cloudflare-pages)
4. [Brancher le domaine jesus-family-kingdom.com](#4-brancher-le-domaine-jesus-family-kingdomcom)
5. [Modifier le contenu avec l'admin](#5-modifier-le-contenu-avec-ladmin)
6. [Écrire un article de blog](#6-écrire-un-article-de-blog)
7. [Configurer les formulaires (Web3Forms)](#7-configurer-les-formulaires-web3forms)
8. [⚠️ À compléter par JFK avant la mise en ligne définitive](#8--à-compléter-par-jfk-avant-la-mise-en-ligne-définitive)

---

## 1. Stack technique

- **[Astro](https://astro.build)** en sortie 100% statique (`output: 'static'`) : ultra-rapide, aucun serveur nécessaire, parfaitement compatible avec le plan gratuit de Cloudflare Pages.
- **Tailwind CSS** pour le style (palette bleu ciel / vert feuille / orange soleil inspirée du logo JFK).
- **i18n natif Astro** : **anglais en langue principale**, français en second, URLs localisées (`/en/...` et `/fr/...`). L'adresse `/` redirige vers `/en/`.
- **Keystatic** : interface d'administration locale pour modifier les fiches, les photos, les montants et le blog sans toucher au code (voir section 5).
- **Astro Content Collections** (fichiers JSON) pour les profils d'enfants, de missionnaires, d'enseignants, les projets 2026 et les témoignages — modifiables sans toucher au code.
- **Web3Forms** (gratuit, sans serveur) pour tous les formulaires (contact, parrainage, prière).
- **Sitemap automatique** (`@astrojs/sitemap`) et données structurées `schema.org/NGO`.
- Aucune base de données, aucun backend à maintenir : tout est fichiers statiques + formulaires externes gratuits.

## 2. Lancer le site en local

Prérequis : [Node.js](https://nodejs.org) version 18 ou plus (LTS recommandé).

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site est alors accessible sur **http://localhost:4321**. Toute modification d'un fichier est répercutée instantanément dans le navigateur.

Autres commandes utiles :

```bash
npm run build     # Génère la version statique de production dans /dist
npm run preview   # Prévisualise localement la version buildée (identique à la prod)
```

## 3. Déployer sur GitHub + Cloudflare Pages

### Étape A — Créer le dépôt GitHub (compte gratuit)

1. Crée un compte gratuit sur [github.com](https://github.com) si besoin.
2. Crée un nouveau dépôt (par exemple `jfk-site`), vide, sans README ni licence (le projet en a déjà un).
3. Dans ce dossier de projet, connecte le dépôt distant et pousse le code :

```bash
git remote add origin https://github.com/TON_COMPTE/jfk-site.git
git branch -M main
git push -u origin main
```

### Étape B — Connecter Cloudflare Pages

1. Crée un compte gratuit sur [dash.cloudflare.com](https://dash.cloudflare.com).
2. Dans le tableau de bord, va dans **Workers & Pages** → **Create application** → onglet **Pages** → **Connect to Git**.
3. Autorise Cloudflare à accéder à ton compte GitHub, puis sélectionne le dépôt `jfk-site`.
4. Configure le build avec ces paramètres :
   - **Framework preset** : `Astro`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Node version** : ajoute une variable d'environnement `NODE_VERSION` = `20` (ou plus) si Cloudflare ne la détecte pas automatiquement.
5. Clique sur **Save and Deploy**. Cloudflare installe les dépendances, build le site et le publie sur une URL du type `jfk-site.pages.dev`.
6. À chaque `git push` sur la branche `main`, Cloudflare Pages redéploie automatiquement le site (déploiement continu gratuit).

## 4. Brancher le domaine jesus-family-kingdom.com

1. Dans le projet Cloudflare Pages, va dans l'onglet **Custom domains** → **Set up a custom domain**.
2. Saisis `www.jesus-family-kingdom.com` (et éventuellement `jesus-family-kingdom.com` pour la racine).
3. Si le domaine est déjà géré par Cloudflare (zone DNS existante) : Cloudflare crée automatiquement l'enregistrement DNS nécessaire (CNAME) et active le HTTPS automatique (certificat SSL gratuit) en quelques minutes.
4. Si le domaine est enregistré ailleurs : soit tu transfères la gestion DNS vers Cloudflare (recommandé, gratuit), soit tu ajoutes manuellement chez ton registrar l'enregistrement CNAME fourni par Cloudflare Pages pointant vers `jfk-site.pages.dev`.
5. Pense à créer une redirection de `jesus-family-kingdom.com` vers `www.jesus-family-kingdom.com` (ou l'inverse) dans **Rules → Redirect Rules** pour éviter le contenu dupliqué.

## 5. Modifier le contenu avec l'admin

Le site a une interface d'administration qui tourne **uniquement sur ton ordinateur**. Rien de l'admin n'est publié en ligne.

### Ouvrir l'admin

1. Double-clique sur **`Ouvrir-Admin-JFK.bat`**, à la racine du dossier du site.
2. Une fenêtre noire s'ouvre : **laisse-la ouverte** pendant que tu travailles. Ton navigateur s'ouvre tout seul sur l'admin (`http://127.0.0.1:4321/keystatic`).
3. Pour voir le site pendant que tu travailles : `http://127.0.0.1:4321/en/`.
4. Pour arrêter l'admin : ferme la fenêtre noire.

Les boutons de l'admin sont en anglais : **Add** = ajouter, **Save** = enregistrer, **Choose file** = choisir un fichier, **Remove** = retirer. Chaque champ est expliqué en français.

### Ce que tu peux modifier

| Menu de l'admin | Ce qu'il contient |
|---|---|
| Contenu › Blog | Les articles (voir section 6) |
| Contenu › Enfants à parrainer | Fiches, photos, statut « en attente » / « parrainé » |
| Contenu › Missionnaires, Enseignants missionnaires, Témoignages | Fiches et photos |
| Projets › Projets 2026, Écoles de village à financer | Textes, objectif, montant déjà réuni (les jauges se recalculent seules) |
| Réglages du site › Chiffres d'impact | Les compteurs de la page d'accueil |
| Réglages du site › Photos des pages | La grande image du haut de chaque page, le portrait du président |
| Réglages du site › Coordonnées et réseaux | Adresse, téléphones, email, Facebook, Instagram, clé Web3Forms, rapport annuel (PDF) |
| Réglages du site › Moyens de paiement | Liens Stripe et PayPal, virement bancaire, Mobile Money |
| Réglages du site › Montants et répartition des dons | Formules de parrainage, soutien missionnaire et enseignant, répartition des dons |

**Photos :** pas besoin de les réduire avant de les ajouter, le site les redimensionne et les convertit automatiquement. La liste des 32 photos attendues est dans `IMAGES-A-FOURNIR.md` (et sa version Word `IMAGES-A-FOURNIR.docx`).

**Protection de l'enfance :** la photo d'un enfant ne s'affiche sur le site que si la case « J'ai l'accord écrit du tuteur légal » est cochée dans sa fiche.

### Publier tes modifications

1. Clique sur **Save** dans l'admin.
2. Double-clique sur **`Publier-Site-JFK.bat`**. Il vérifie que le site se construit, enregistre tes modifications et les envoie sur GitHub.
3. Cloudflare met le site en ligne à jour en 2 minutes environ.

Si la vérification échoue, **rien n'est publié** : le fichier `build.log` créé dans le dossier contient l'explication, à envoyer à Claude.

### Pas encore dans l'admin

Les longs textes des pages (histoire de JFK, piliers, FAQ du parrainage…) sont dans `src/data/pages/*.ts`. Pour l'instant, ils se modifient dans le code, ou en le demandant à Claude.

### Où sont rangées les données (pour un développeur)

- Fiches : `src/content/<collection>/*.json` · articles : `src/content/blog/<adresse>/index.md` (+ `contentFr.md` pour le français)
- Réglages : `src/data/settings/*.json`, remis dans leur forme habituelle par `src/data/site.ts`
- Photos : `src/assets/images/**`, optimisées au build via `src/lib/images.ts` et `src/components/SmartImage.astro`
- Configuration de l'admin : `keystatic.config.ts`. L'admin est lancé par `npm run admin` (variable `JFK_ADMIN=1`). Le build de production ne le charge jamais.
- `@keystatic/astro` est volontairement bloqué en version **5.2.0** : la 6.x est incompatible avec Astro 5.

## 6. Écrire un article de blog

1. Dans l'admin : **Contenu › Blog › Add**.
2. Remplis le **titre**, le **résumé** et l'**article en anglais**. Ajoute une photo de couverture si tu en as une.
3. Facultatif : remplis le titre, le résumé et l'article **en français**. Sans version française, l'article n'apparaît que sur le site anglais.
4. **Save**, puis double-clique sur `Publier-Site-JFK.bat`.

L'onglet **Blog** apparaît dans le menu du site dès le premier article publié. Pour garder un article en brouillon, décoche **Publié**. La barre d'outils de l'éditeur permet d'ajouter des titres, du gras, des listes, des liens et des images.

## 7. Configurer les formulaires (Web3Forms)

Tous les formulaires du site (contact, demande de parrainage, engagement de prière) utilisent [Web3Forms](https://web3forms.com), un service **gratuit** qui envoie les messages par email, sans serveur.

1. Va sur [web3forms.com](https://web3forms.com) et crée une clé d'accès gratuite avec ton adresse email.
2. Copie la clé reçue.
3. Dans l'admin : **Réglages du site › Coordonnées et réseaux › Clé Web3Forms**. Colle la clé, puis **Save**.
4. Double-clique sur `Publier-Site-JFK.bat`.

Chaque formulaire envoie un email avec un objet différent (ex. « New child sponsorship request ») pour t'aider à trier les demandes.

## 8. ⚠️ À compléter par JFK avant la mise en ligne définitive

Le site est **entièrement fonctionnel et déployable tel quel**, mais les éléments suivants sont des placeholders explicites à remplacer avant de communiquer officiellement l'adresse du site :

### Paiements (admin › Réglages du site › Moyens de paiement)
- [ ] `paymentInfo.stripe.oneTimeLink` et `monthlyLink` — remplacer par tes vrais liens Stripe Payment Links (dons ponctuel et mensuel).
- [ ] `paymentInfo.paypal.link` — remplacer par ton lien PayPal.me ou bouton PayPal réel.
- [ ] `paymentInfo.bankTransfer` — RIB complet (titulaire, IBAN, BIC, nom de la banque).
- [ ] `paymentInfo.mobileMoney` — numéros Mvola et Orange Money réels.

### Montants à valider (admin › Réglages du site › Montants et répartition des dons)
- [ ] `sponsorshipTiers` — montants de parrainage (15 € / 30 € / 50 € par mois) : **à valider par JFK**, ce sont des valeurs indicatives réalistes proposées par défaut.
- [ ] `missionarySupport.monthlyAmount` (40 €/mois) et `emergencyCaseCost` (350 $) — **à valider**.
- [ ] `teacherSupport.monthlyAmount` (35 €/mois) et `schoolProjectMin`/`schoolProjectMax` (3000–4000 $) — **à valider**.
- [ ] `fundsAllocation` — répartition indicative de l'utilisation des dons (35% missions / 25% éducation / 25% orphelinat / 10% médical / 5% fonctionnement) — **à valider avec la comptabilité réelle de JFK**.

### Contenu et coordonnées
- [ ] `siteConfig.socials.facebook` et `instagram` — liens exacts vers les pages officielles.
- [ ] `siteConfig.contacts.email` — une adresse email `contact@jesus-family-kingdom.com` a été utilisée par défaut ; confirme qu'elle existe ou remplace-la.
- [ ] Web3Forms — créer la clé d'accès (voir section 7).
- [ ] `annualReportUrl` (`/documents/rapport-annuel-2025.pdf`) — déposer le vrai PDF du rapport annuel dans `public/documents/` (le lien est déjà prêt, il attend juste le fichier).
- [ ] Mentions légales (`src/data/pages/legal.ts`) — préciser le statut juridique exact de l'association/fondation à Madagascar.

### Photos
- [ ] Toutes les photos du site sont des placeholders visuels génériques (voir `IMAGES-A-FOURNIR.md`) — à remplacer par les vraies photos des enfants, missionnaires, enseignants et lieux, **avec consentement pour les enfants**.
- [ ] `public/images/og-default.jpg` — image de partage réseaux sociaux générée automatiquement (dégradé + logo) ; tu peux la remplacer par une vraie photo si tu préfères (dimensions recommandées : 1200×630 px).

### Enseignants missionnaires
- [ ] Les 4 profils d'enseignants (Mialy, Nomena, Feno, Tahiry) sont des **exemples types** créés faute de noms fournis dans le brief initial — remplace-les par les vrais profils de vos enseignants missionnaires.

---

*Site conçu pour Jesus Family Kingdom — Actes 1:8. Que chaque ligne de code serve la mission.*
