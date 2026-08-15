# Portfolio — Yacine Djadel

Site de recherche d'alternance. Développeur full stack & data, en route vers
un Master Data & Intelligence Artificielle.

**En ligne :** [yacinedjadel.nettya.fr](https://yacinedjadel.nettya.fr/)

## Stack

- **React 19** + **Vite 7** — site statique, aucun serveur applicatif
- **Framer Motion** — animations au défilement, révélations, transitions
- **Lenis** — défilement lissé
- CSS écrit à la main, pas de framework

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # génère dist/
npm run preview  # sert le build de production
npm run lint
```

## Structure

```
src/
  components/   composants d'interface et sections de la page
  data/         contenu du site (textes, projets, compétences)
  lib/          hooks (défilement lissé, effet magnétique)
  styles/       variables, base, styles de section, polices
public/
  fonts/        polices hébergées par le projet
  projects/     captures des projets
  .htaccess     compression et cache pour hébergement Apache
```

Tout le contenu éditable est regroupé dans [`src/data/content.js`](src/data/content.js) :
textes, projets, compétences, parcours. Pas besoin de toucher aux composants
pour mettre le site à jour.

## Choix techniques

**Polices hébergées par le projet.** Google Fonts est bloqué sur beaucoup de
réseaux d'entreprise. Sans les fichiers en local, le navigateur retombe sur une
police de repli presque deux fois moins large et la mise en page se casse — un
mauvais moment pour ça quand c'est un recruteur qui regarde. Les versions
variables sont utilisées : un fichier par famille au lieu d'un par graisse.

**Animations dégradables.** Toutes les révélations respectent
`prefers-reduced-motion`. Le titre de la section contact dispose en plus d'un
filet : s'il est à l'écran plus d'une seconde sans avoir été révélé, il
s'affiche en texte simple. Un texte invisible en permanence n'est jamais
acceptable.

**Accessibilité.** Contrastes vérifiés au niveau AA sur l'ensemble des textes,
navigation au clavier, et zéro violation relevée par axe-core.

## Déploiement

Le site est statique : `npm run build` produit `dist/`, dont le contenu est
déposé à la racine web de l'hébergement. Le fichier `.htaccess` est inclus et
doit être transféré avec le reste — la plupart des clients FTP masquent les
fichiers commençant par un point.
