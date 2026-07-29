# 🎮 ଓଡ଼ିଆ ମାଧ୍ୟମ Learning Games — Full-Stack Educational Platform

Production-ready Full-Stack Educational Gaming Platform for Class 1 to Class 5 Odia Medium students.

## 🚀 Recommended Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla CSS), Modern JavaScript (ES6+), Progressive Web App (PWA).
- **Backend**: Node.js, Express.js REST API.
- **Database**: MongoDB & Mongoose ODM (with automatic embedded memory fallback).
- **Authentication**: JWT with Password Hashing via `bcryptjs`.
- **Security**: Helmet, CORS, Express Rate Limiting, Input Validation, Role-Based Access Control (`student`, `admin`).

---

## 📁 Project Structure

```
odisha-learning-games/
├── package.json
├── .env.example
├── .env
├── README.md
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js           # Centralized API fetch client with JWT
│   │   ├── auth.js          # Auth modal, login, register, profile drawer
│   │   ├── admin.js         # Admin dashboard analytics & question management
│   │   ├── games.js         # Interactive game engine with server-side validation
│   │   ├── app.js           # Main application routing and stats sync
│   │   ├── audio.js         # Audio FX synthesizer
│   │   └── pwa.js           # Service worker registration
│   ├── pages/
│   │   ├── class1.html ... class5.html
│   │   ├── about.html, contact.html, privacy.html, terms.html
│   ├── manifest.webmanifest
│   ├── service-worker.js
│   ├── robots.txt
│   └── sitemap.xml
└── backend/
    ├── server.js            # HTTP Server entry point
    ├── app.js               # Express application configuration
    ├── config/
    │   └── database.js      # MongoDB & Mongoose connection setup
    ├── models/
    │   ├── User.js, Class.js, Subject.js, Chapter.js, Game.js
    │   ├── Question.js, Attempt.js, Progress.js, Badge.js, UserBadge.js
    ├── controllers/
    │   ├── authController.js, userController.js, classController.js
    │   ├── subjectController.js, chapterController.js, gameController.js
    │   ├── questionController.js, progressController.js, badgeController.js
    │   └── adminController.js
    ├── routes/
    │   ├── authRoutes.js, userRoutes.js, classRoutes.js, subjectRoutes.js
    │   ├── chapterRoutes.js, gameRoutes.js, questionRoutes.js, progressRoutes.js
    │   ├── badgeRoutes.js, adminRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js, adminMiddleware.js, errorMiddleware.js, validationMiddleware.js
    ├── utils/
    │   ├── generateToken.js, calculateScore.js, badgeEngine.js
    └── seed/
        └── seedData.js       # Database seed script for Classes 1-5 & accounts
```

---

## 💻 Local Setup & Execution

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` settings:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/odia_learning_games
JWT_SECRET=odia_learning_games_super_secret_jwt_key_2026
JWT_EXPIRE=30d
NODE_ENV=development
```

### 2. Seed Database
Populate Classes 1–5, subjects, chapters, games, questions, system badges, admin account, and student demo:
```bash
npm run seed
```

**Seeded Credentials**:
- **Admin User**: `admin@odisha.edu` / `Admin@123456`
- **Student Demo**: `rahul@student.edu` / `Student@123456`

### 3. Run Backend & Frontend Server
```bash
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## 🔍 Google Search Console & SEO Verification

To index this site on Google Search:
1. Deploy the full application to a hosting platform (e.g. Render / Railway / Vercel).
2. Connect your custom domain (e.g., `https://odishalearninggames.in`).
3. Open **Google Search Console** and select "Add Property".
4. Replace `YOUR_VERIFICATION_CODE` in `frontend/pages/class1.html` with your actual verification meta tag:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
5. Submit `sitemap.xml` URL (`https://yourdomain.com/sitemap.xml`) under Sitemaps section.
6. Request Indexing for primary class pages (`/pages/class1.html` to `/pages/class5.html`).

---

## 📱 PWA Installation

- Open [http://localhost:5000](http://localhost:5000) on Google Chrome or Android device.
- Click **Add to Home Screen** or install prompt.
- `service-worker.js` handles offline caching for frontend styles, sound, and core scripts.

---

## 🛡️ Security Features

1. **Server-Side Game Answer Validation**: Correct answer indexes are never sent in `GET /api/games/:gameId/questions` to prevent browser devtools inspection. Answers are validated on `POST /api/games/:gameId/submit`.
2. **Password Security**: Passwords hashed using `bcryptjs` with salt rounds.
3. **Role-Based Access Control**: Sensitive routes (`/api/admin/*`) strictly protected by `requireAuth` + `requireAdmin`.
