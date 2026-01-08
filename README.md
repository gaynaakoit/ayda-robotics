# AYDA Robotics

AYDA Robotics est un projet regroupant plusieurs applications pour la détection d'événements et la visualisation en temps réel.  
Le projet inclut un **frontend Angular** et un **backend NestJS** avec WebSocket pour la communication en temps réel.

---

## Structure du repository

```

ayda-robotics/
├── dashboard/ayda-dashbord   # Frontend Angular
├── backend/ayda-backend      # Backend NestJS
├── README.md                 # Ce fichier
├── .gitignore
├── package.json
└── ...

````

---

## Prérequis

- Node.js >= 18  
- Angular CLI (`npm install -g @angular/cli`)  
- NestJS CLI (`npm install -g @nestjs/cli`)  
- Git  

---

## Installation Frontend (Angular)

```bash
cd dashboard/ayda-dashbord
npm install
ng serve
````

Le frontend sera accessible sur [http://localhost:4200](http://localhost:4200).

---

## Installation Backend (NestJS)

```bash
cd backend/ayda-backend
npm install
npm run start
```

Le backend sera accessible sur [http://localhost:3000](http://localhost:3000) et le WebSocket sur `ws://localhost:3000`.

---

## WebSocket - Temps réel

Le backend utilise **Socket.IO** pour envoyer des événements en temps réel au frontend.

* **Événement écouté par Angular** : `face-detected`
* **Exemple d’émission côté backend** :

```ts
// src/events/events.gateway.ts
this.server.emit('face-detected', { personId, confidence, timestamp });
```

* **Exemple côté Angular** :

```ts
this.socketService.onFaceDetected().subscribe(event => {
  console.log('Event reçu:', event);
  this.alerts.push(event);
});
```

---

## Conventions de code

* Prettier est configuré avec :

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

* Les commits doivent suivre les conventions Git :

  * `feat:` pour une nouvelle fonctionnalité
  * `fix:` pour un bug
  * `docs:` pour la documentation

---

## Notes

* Ce repository contient plusieurs projets. Assurez-vous d’être dans le bon dossier (`dashboard/ayda-dashbord` ou `backend/ayda-backend`) avant d’exécuter les commandes `npm install` ou `npm run start`.
* Pour toute contribution, créez une **branche dédiée** et faites un **pull request** vers `main`.

---

## Licence

MIT License © [Abdoulaye kane / Gaynaako IT]
