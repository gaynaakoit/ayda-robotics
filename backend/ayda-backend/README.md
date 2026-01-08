<p align="center">  
<a href="https://nestjs.com/" target="_blank">  
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />  
</a>  
</p>

<h1 align="center">Backend API – Ayda</h1>

<p align="center">
  🚀 Backend API construite avec <strong>NestJS</strong> pour l’application <strong>Ayda</strong> — scalable, maintenable et testable.
</p>

---

## 🧩 Description

Ce dépôt contient le **backend de l’application Ayda**, développé avec **NestJS (TypeScript)**.  
Il fournit une **API REST** pour gérer les fonctionnalités principales de l’application (authentification, utilisateurs, données métiers, etc.), avec une architecture modulaire et des bonnes pratiques intégrées.

---

## 🚀 Fonctionnalités

- API REST modulaires
- Validation des entrées (DTOs)
- Gestion des erreurs centralisée
- Documentation Swagger (OpenAPI)
- Tests unitaires & E2E
- Prêt pour un déploiement production

---

## 📦 Installation

Assure-toi d’avoir **Node.js (>=16)** installé.

```bash
# Clone le projet
$ git clone https://github.com/ton-utilisateur/backend-ayda.git
$ cd backend-ayda

# Installe les dépendances
$ npm install
````

---

## ▶️ Démarrage

```bash
# En développement (avec rechargement automatique)
$ npm run start:dev

# En production
$ npm run start:prod
```

L’API sera disponible par défaut sur : [http://localhost:3000](http://localhost:3000)

---

## 📄 Documentation de l’API (Swagger)

Une fois le serveur démarré :

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

Cette page donne une documentation interactive de toutes les routes de l’API.

---

## 🧪 Tests

```bash
# Tests unitaires
$ npm run test

# Tests E2E
$ npm run test:e2e

# Rapport de couverture
$ npm run test:cov
```

---

## ⚙️ Configuration

Crée un fichier `.env` à la racine du projet avec tes variables d’environnement :

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/ayda
JWT_SECRET=taCleSecrete
```

*(Adapte ces valeurs selon ton environnement)*

---

## 📁 Structure recommandée (extrait)

```
src/
├─ modules/
│   ├─ auth/
│   ├─ users/
│   └─ features/
├─ common/
│   ├─ filters/
│   ├─ interceptors/
│   └─ dto/
├─ config/
├─ main.ts
└─ app.module.ts
```

---

## 📦 Déploiement

Pour un build production :

```bash
# Build
$ npm run build

# Start production
$ npm run start:prod
```

Tu peux déployer sur des plateformes comme **Render**, **Heroku**, **Fly.io**, **AWS**, ou servir en serverless.

---

## 🧠 Bonnes pratiques suggérées

* Active **ESLint** et **Prettier**
* Configure **CI/CD** (ex. GitHub Actions)
* Active un système de logs et monitoring (Sentry, Datadog, etc.)
* Versionne ton API (ex: `/api/v1/...`)

---

## 🤝 Contribuer

Les contributions sont les bienvenues !
Merci de forker, créer une branche `feature/...`, puis ouvrir une *Pull Request*.

---

## 📜 Licence

Ce projet est sous licence **MIT**.
Powered by NestJS 💙