## Description

API générale d'Euphron - Une API RESTful construite avec NestJS pour gérer le média Euphron et ses applications, incluant des opérations CRUD (Create, Read, Update, Delete) et intégrée avec une base de données MariaDB via Prisma.

## Configuration du projet
- Crétion du container docker
```bash
$ docker-compose up app db -d
```
> (app ou app-dev en fonction de l'environnement)
- Installation des dépendances
```bash
$ npm install
```
- Création des tables dans la base de données
```bash
$ npx prisma migrate dev
```
## Lancer les tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Ressources

Consultez quelques ressources qui peuvent être utiles lorsque vous travaillez avec NestJS :

- Visitez la [documentation NestJS](https://docs.nestjs.com) pour en savoir plus sur le framework.
- Pour aller plus loin et acquérir plus d'expérience pratique, consultez nos [cours vidéo officiels](https://courses.nestjs.com/).
- Déployez votre application sur AWS avec l'aide de [NestJS Mau](https://mau.nestjs.com) en quelques clics seulement.
- Visualisez le graphe de votre application et interagissez avec l'application NestJS en temps réel en utilisant [NestJS Devtools](https://devtools.nestjs.com).
- Pour rester informé et recevoir des mises à jour, suivez-nous sur [X](https://x.com/nestframework) et [LinkedIn](https://linkedin.com/company/nestjs).

