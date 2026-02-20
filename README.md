
# BDE Info website

> Site web officiel du BDE de l'IUT Informatique Lyon 1 - site Doua.

Ce README est à l'intention de tous les mainteneurs du projet. 
Donc avant toute chose, gros ❤ sur vous et n'oubliez jamais que vous faites partie de la meilleure association étudiante de tous les temps 😎
#LesIUTsDominentLeMonde

## Technologies

Dans la suite de ce document, nous allons désigner la partie *front-end* de *client* et la partie *back-end* de *serveur*, afin d'être raccord avec le nom des dossiers du code source.

### Client | Next.js

Le front est une application **React** rendue à l'aide du ~~merveilleux~~ framework [Next.js](https://nextjs.org/).
Dans les grandes lignes, Next.js permet d'avoir un mode de rendu hybride, combinant :
- **SSG** (Static Server Generation) -> application générée côté serveur au moment de la compilation
- **SSR** (Server Side Rendering) -> application générée côté serveur à chaque requête d'un client
- **CSR** (Client Side Rendering) -> l'application est *hydratée* côté client
Plus d'informations des fonctionnalités clées du framework [ici](https://medium.com/@surekarajainfo/important-features-of-next-js-dd88d39e8ce8).

Afin de pouvoir modifier le client, il vous est donc conseillé de bien connaître React et de vous renseigner sur Next.js.

### Serveur | Strapi

Quant au back du site, il s'agit d'une application [Strapi](https://strapi.io/), un headless CMS open source à la fois simple d'utilisation et extrêmement puissant.

Il permet de gérer les données ainsi que leur ajouts via une interface pré-faite et un système d'utilisateurs possédants différents niveaux de droits. Le tout est accessible à n'importe quelle application externe à l'aide d'une API générée automatiquement.


## Architecture

Le site a été plus ou moins conceptualisé comme une [JAMStack](https://jamstatic.fr/2019/02/07/c-est-quoi-la-jamstack/). Le front-end et le back-end sont totalement découplés et intéragissent entre eux à l'aide d'appels API.

<p align="center">
    <img src="https://i.imgur.com/aIlQFKr.png">
</p>
    

Comme expliqué précédemment, Next.js propose plusieurs modes de rendu. Étant donné que le site du BDE est principalement statique, mais possède tout de même des données qui changent de temps en temps (la liste des évènements), le choix a été fait d'utiliser le mode de rendu [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).

Donc concrètement, l'application est générée au moment de la compilation, mais va vérifier tous les *x* temps si les données n'ont pas changées. Si c'est le cas, alors la page concernée sera re-générée.
Ainsi, on bénéficie des avantages de la génération statique côté serveur, et tout particulièrement d'une rapidité époustouflante côté client couplée à une faible charge côté serveur étant donnée que le HTML, CSS et JS sont déjà générés et n'attendent qu'à être envoyés aux utilisateurs.
De plus, les pages déjà générées seront mises à jour régulièrement avec les dernières données en date.
<br>
<p align="center">
    <img width="75%" src="https://i.imgur.com/RPlUg0K.png">
</p>

## Structure du projet

Seule la structure de l'application Next.js va être détaillée. 
En effet, sauf cas exceptionnel il est très peu utile de modifier directement le code source de l'application Strapi car tout se gère depuis le panel administrateur.

```js
client 
├── next.config.js // config de Next.js
├── jsconfig.js // configuration webpack, etc
├── config // fichiers de configurations du code source
├── public // fichiers statiques délivrés tels quels aux utilisateurs
│   ├─ scripts // scripts Javascript
│   ├─ styles // fichiers de style SASS globaux
│   └─ assets // images, svg, favicons, etc
└─ src // contient le code source de l'application
    ├─ components // composants React
    │   ├─ elements // composants primaires (ex: un bouton)
    │   ├─ modules // compositions d'elements (ex: un form, une navbar, etc)
    │   ├─ layout // façon d'agencer la page
    │   └─ templates // contenu des pages
    ├─ hooks // hooks React personalisés
    └─ utils // fonctions utilitaires
```

## Crédits

Voici la liste des personnes ayant contribuées au projet. Si tu es un nouveau mainteneur, n'hésite pas à les contacter pour leur poser des questions sur le code ou autre !

- [Bartholomé GILI](https://www.github.com/barthofu) (auteur) - *2021/2022*
- [Emilien C.](https://github.com/Emilcha) (mainteneur) - *depuis 2025*
