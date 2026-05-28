# 🚀 IdeaVault – Startup Idea Sharing Platform

IdeaVault is a modern full-stack web application where users can share startup ideas, explore innovative concepts from others, and engage in meaningful discussions through comments. The platform focuses on collaboration, validation, and improvement of startup ideas through community interaction.

---

## 🌐 Live Links

- 🔗 Client Live: https://idea-vault-xi-self.vercel.app/
- 🔗 Server Live: https://ideavault-server-beige.vercel.app/

---

## 📂 GitHub Repositories

- 💻 Client Repository: https://github.com/hridoy-web/IdeaVault  
- 🛠️ Server Repository: https://github.com/hridoy-web/IdeaVault-Server  

---

## ✨ Key Features

- 🔐 Authentication using **BetterAuth (Email/Password + Google Login)**
- 🧠 Users can create, explore, and share startup ideas
- 💬 Full comment system (Add, Edit, Delete own comments)
- 📊 Trending ideas based on user engagement
- 🔎 Search ideas by title
- 🧩 Filter ideas by category
- 🌓 Dark / Light theme support
- 👤 User profile management system
- 📱 Fully responsive design (Mobile, Tablet, Desktop)
- ⚡ Toast notifications for all actions
- 🔄 Smooth loading states and protected routes

---

## 🧩 Core Features

### 🏠 Home Page
- Hero slider with startup-focused content (3+ slides)
- Trending ideas section (limited results)
- CTA button → Explore Ideas

### 💡 Ideas System
- Add startup ideas (protected route)
- View all ideas in a responsive 3-column grid
- Dedicated idea details page with full information

### 💬 Interaction System
- Users can comment on ideas
- Edit and delete only their own comments
- View interaction history in “My Interactions”

### 👤 User Dashboard
- My Ideas (update & delete functionality)
- My Interactions (comment history tracking)

---

## 🔐 Authentication System (BetterAuth)

- Implemented with **BetterAuth**
- Secure login and registration system
- Google authentication support
- JWT-based session handling
- Protected routes 
- Strong password rules:
  - Minimum 6 characters
  - Must include uppercase and lowercase letters

---

## ⚙️ Tech Stack

### Frontend
- Next.js (React Framework)
- Tailwind CSS
- DaisyUI
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- BetterAuth
- JWT Authentication

---

## 🎨 UI / UX Highlights

- Clean and modern UI design
- Consistent spacing and typography
- Fully responsive layout (mobile-first)
- Reusable UI components
- Toast notifications for all actions
- Loading spinner for async operations
- Smooth navigation without page reload issues

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## 🛠️ Setup Instructions

### Client Setup

```bash
git clone https://github.com/hridoy-web/IdeaVault
cd IdeaVault
npm install
npm run dev

---

### Server Setup

```bash
git clone https://github.com/hridoy-web/IdeaVault-Server
cd IdeaVault-Server
npm install
npm run dev

---
