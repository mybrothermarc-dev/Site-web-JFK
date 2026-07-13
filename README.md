# Site web — Jesus Family Kingdom (JFK)

Site vitrine et de levée de fonds pour Jesus Family Kingdom, œuvre chrétienne missionnaire à Madagascar. Bilingue français / anglais, construit avec [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), pensé pour être hébergé gratuitement sur **Cloudflare Pages**.

## Sommaire

1. [Stack technique](#1-stack-technique)
2. [Lancer le site en local](#2-lancer-le-site-en-local)
3. [Déployer sur GitHub + Cloudflare Pages](#3-déployer-sur-github--cloudflare-pages)
4. [Brancher le domaine jesus-family-kingdom.com](#4-brancher-le-domaine-jesus-family-kingdomcom)
5. [Modifier les textes, profils, montants et jauges](#5-modifier-les-textes-profils-montants-et-jauges)
6. [Remplacer les photos](#6-remplacer-les-photos)
7. [Configurer les formulaires (Web3Forms)](#7-configurer-les-formulaires-web3forms)
8. [⚠️ À compléter par JFK avant la mise en ligne définitive](#8--à-compléter-par-jfk-avant-la-mise-en-ligne-définitive)

---

## 1. Stack technique

- **[Astro](https://astro.build)** en sortie 100% statique (`output: 'static'`) : ultra-rapide, aucun serveur nécessaire, parfaitement compatible avec le plan gratuit de Cloudflare Pages.
- **Tailwind CSS** pour le style (palette bleu ciel / vert feuille / orange soleil inspirée du logo JFK).
- **i18n natif Astro** : français par défaut, anglais en second, URLs localisées (`/fr/...` et `/en/...`).
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

## 5. Modifier les textes, profils, montants et jauges

Tout le contenu éditable vit dans deux dossiers, **sans jamais toucher aux fichiers de `src/components/` ou `src/layouts/`** :

### `src/content/` — fiches individuelles (JSON)

| Dossier | Contenu | Champs à modifier |
|---|---|---|
| `src/content/children/` | Profils d'enfants à parrainer | `firstName`, `age`, `status` (`available` ou `sponsored`), `bio.fr` / `bio.en` |
| `src/content/missionaries/` | Profils de missionnaires | `firstName`, `zone`, `summary`, `stats` |
| `src/content/teachers/` | Profils d'enseignants missionnaires | `firstName`, `village`, `summary` |
| `src/content/projects2026/` | Les 3 grands projets 2026 | `title`, `description`, `budgetGoal`, `budgetRaised` (la jauge se recalcule automatiquement) |
| `src/content/villageSchools/` | Projets de financement d'écoles de village | `villageName`, `budgetGoal`, `budgetRaised` |
| `src/content/testimonials/` | Témoignages courts | `name`, `role`, `quote` |

Pour **ajouter** un nouvel enfant, un nouveau missionnaire, etc. : duplique un fichier JSON existant du même dossier, renomme-le, et modifie ses valeurs. Il apparaîtra automatiquement sur le site au prochain déploiement.

Pour **retirer** un profil (ex : un enfant qui a trouvé un parrain et ne doit plus apparaître) : passe simplement `"status": "sponsored"` (il reste visible mais non parrainable), ou supprime le fichier JSON pour qu'il disparaisse complètement.

### `src/data/site.ts` — réglages globaux du site

Ce fichier centralise :
- les coordonnées de contact et réseaux sociaux,
- **les montants de parrainage** (`sponsorshipTiers`),
- **le montant de soutien mensuel** d'un missionnaire et d'un enseignant (`missionarySupport`, `teacherSupport`),
- les moyens de paiement (Stripe, PayPal, virement, Mobile Money),
- la répartition des fonds affichée sur la page Don (`fundsAllocation`),
- les chiffres d'impact 2025 (`impactStats2025`) — à mettre à jour chaque année.

### `src/data/pages/*.ts` — textes longs de chaque page

Chaque page a son fichier de contenu bilingue (ex. `src/data/pages/home.ts` pour l'accueil, `sponsor-child.ts` pour le parrainage, etc.). Chaque texte existe en deux versions, `fr` et `en` : modifie l'une, pense à adapter l'autre.

## 6. Remplacer les photos

Actuellement, toutes les photos (enfants, missionnaires, enseignants, hero, projets) sont des **placeholders visuels générés** (dégradés de couleur + icône + mention « Photo à venir »), produits par le composant `src/components/PlaceholderImage.astro`. **Aucune photo de banque d'images générique n'a été utilisée**, comme demandé.

Pour remplacer un placeholder par une vraie photo :

1. Dépose l'image dans `public/images/` (formats recommandés : `.jpg` ou `.webp`, compressée, moins de 300 Ko par image pour rester performant et respecter les limites du plan gratuit Cloudflare Pages).
2. Dans le fichier `.astro` de la page concernée (ou dans le composant `ProfileCard.astro` si tu veux généraliser à toutes les fiches), remplace la balise `<PlaceholderImage ... />` par une balise `<img src="/images/ton-fichier.jpg" alt="Description" class="..." />` en conservant les mêmes classes CSS pour garder la mise en page.
3. Pense à toujours renseigner un attribut `alt` descriptif pour l'accessibilité — et à respecter la [politique de protection de l'enfance](#8--à-compléter-par-jfk-avant-la-mise-en-ligne-définitive) (consentement, pas de localisation identifiable).

## 7. Configurer les formulaires (Web3Forms)

Tous les formulaires du site (contact, demande de parrainage, engagement de prière) utilisent [Web3Forms](https://web3forms.com), un service **gratuit** qui envoie les soumissions par email sans nécessiter de serveur.

1. Va sur [web3forms.com](https://web3forms.com) et crée une clé d'accès gratuite avec ton adresse email (aucune inscription complexe requise).
2. Copie la clé fournie.
3. Ouvre `src/data/site.ts` et remplace :
   ```ts
   export const web3FormsAccessKey = 'WEB3FORMS_ACCESS_KEY_A_REMPLACER';
   ```
   par ta propre clé.
4. Redéploie le site (`git push`) : tous les formulaires du site enverront désormais réellement leurs messages à l'adresse email associée à ta clé Web3Forms.

Chaque formulaire envoie un email avec un objet différent (ex. « Nouvelle demande de parrainage d'enfant ») pour t'aider à trier les demandes.

## 8. ⚠️ À compléter par JFK avant la mise en ligne définitive

Le site est **entièrement fonctionnel et déployable tel quel**, mais les éléments suivants sont des placeholders explicites à remplacer avant de communiquer officiellement l'adresse du site :

### Paiements (`src/data/site.ts`)
- [ ] `paymentInfo.stripe.oneTimeLink` et `monthlyLink` — remplacer par tes vrais liens Stripe Payment Links (dons ponctuel et mensuel).
- [ ] `paymentInfo.paypal.link` — remplacer par ton lien PayPal.me ou bouton PayPal réel.
- [ ] `paymentInfo.bankTransfer` — RIB complet (titulaire, IBAN, BIC, nom de la banque).
- [ ] `paymentInfo.mobileMoney` — numéros Mvola et Orange Money réels.

### Montants à valider (`src/data/site.ts`)
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
- [ ] Toutes les photos du site sont des placeholders visuels génériques (voir section 6) — à remplacer par les vraies photos des enfants, missionnaires, enseignants et lieux, **avec consentement pour les enfants**.
- [ ] `public/images/og-default.jpg` — image de partage réseaux sociaux générée automatiquement (dégradé + logo) ; tu peux la remplacer par une vraie photo si tu préfères (dimensions recommandées : 1200×630 px).

### Enseignants missionnaires
- [ ] Les 4 profils d'enseignants (Mialy, Nomena, Feno, Tahiry) sont des **exemples types** créés faute de noms fournis dans le brief initial — remplace-les par les vrais profils de vos enseignants missionnaires.

---

*Site conçu pour Jesus Family Kingdom — Actes 1:8. Que chaque ligne de code serve la mission.*
