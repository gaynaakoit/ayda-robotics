<p align="center">
  <a href="https://angular.io" target="_blank">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="120" alt="Angular Logo" />
  </a>
</p>

<h1 align="center">Ayda — Frontend Angular</h1>

<p align="center">
  🚀 Interface web pour l’application <strong>Ayda</strong>, développée avec <strong>Angular</strong> – rapide, maintenable et réactive.
</p>

---

## 📌 Description

Ce dépôt contient le **frontend de l’application Ayda**, construit avec **Angular**.  
Il sert d’interface utilisateur pour naviguer à travers les fonctionnalités de l’application en temps réel avec une expérience moderne.

---

## 🧰 Technologies

- 📌 **Angular 11+**
- 📦 TypeScript
- 💅 HTML & CSS / SCSS
- ⚡ RxJS
- 🛠 Angular CLI

---

## 🚀 Fonctionnalités

- Navigation modulaire
- Chargement dynamique des composants
- Gestion des formulaires réactive
- API intégration via services
- Support des tests unitaires

---

## 📦 Installation

Assure-toi d’avoir installé :

✔️ Node.js (>=14)  
✔️ Angular CLI (recommandé)

```bash
# Clone le projet
$ git clone https://github.com/gaynaakoit/ayda-dashbord.git
$ cd ayda-dashbord

# Installe les dépendances
$ npm install
````

---

## 🧑‍💻 Démarrage (dev)

```bash
# Lancer le serveur de développement
$ ng serve

# Ouvre dans le navigateur
# http://localhost:4200
```

L’application se recharge automatiquement lorsque tu modifies un fichier source.

---

## 🧱 Code scaffolding

Pour générer rapidement un composant, service, directive, etc :

```bash
# Exemple : générer un nouveau composant
$ ng generate component nom-du-composant

# Ou abrégé
$ ng g c nom-du-composant
```

Tu peux aussi générer :

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

## 📦 Build

Pour compiler et créer les fichiers de production :

```bash
$ ng build
```

Les fichiers de build seront générés dans le dossier :

```
dist/ayda-frontend/
```

Pour une build optimisée production :

```bash
$ ng build --prod
```

---

## 🧪 Tests

### Tests unitaires

```bash
$ ng test
```

Ceci lance les tests unitaires via **Karma**.

### Tests end-to-end (E2E)

```bash
$ ng e2e
```

Lance les tests end-to-end via **Protractor**.

---

## 📄 Organisation du code

```
src/
├─ app/
│   ├─ core/          # services globaux, interceptors, guards
│   ├─ shared/        # composants réutilisables
│   ├─ features/      # modules et vues principales
│   ├─ assets/        # images, styles, traductions
│   ├─ environments/  # config dev/prod
│   └─ app.module.ts
├─ index.html
└─ styles.scss
```

---

## ⚙️ Configuration

Les environnements sont configurés dans :

```
src/environments/
├─ environment.ts
├─ environment.prod.ts
```

Modifie ces fichiers pour adapter l’URL de ton API backend ou autres variables.

---

## 📦 Déploiement

Une fois build, les fichiers statiques peuvent être servis avec :

✔️ **Netlify**
✔️ **Vercel**
✔️ **Firebase Hosting**
✔️ **S3 + CloudFront**
✔️ **Serveur Nginx / Apache**

Exemple rapide avec **serve** :

```bash
# Installer
$ npm install -g serve

# Lancer
$ serve -s dist/ayda-frontend
```

---

## 💡 Bonnes pratiques

* Utilise **ESLint / Prettier** pour un code propre
* Active **CI/CD** (GitHub Actions / GitLab CI)
* Ajoute des tests unitaires pour tes composants/services
* Versionne ton app avec des tags git

---

## 🤝 Contribuer

Les contributions sont les bienvenues !
Merci de :

1. Forker le projet
2. Créer une branche `feature/...`
3. Ouvrir une *Pull Request*

---

## 📝 Licence

Ce projet est sous licence **MIT**.
Made with ❤️ by l’équipe Ayda.
