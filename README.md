# 🍽️ Restaurant System Client

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![MUI](https://img.shields.io/badge/MUI-Material_UI-007FFF?style=for-the-badge&logo=mui)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge)

> React-frontend för Restaurant System API.  
> Byggd med **Vite**, **MUI** och **React Router** med JWT-autentisering och skyddade routes.

---

## 📂 Projektstruktur

```text
src/
├── api/                    # Axios-klient och API-anrop
│   ├── axiosClient.js      # Bas-klient med JWT-interceptor
│   ├── authApi.js          # Login och registrering
│   ├── categoryApi.js      # CRUD för kategorier
│   ├── menuItemApi.js      # CRUD för menyartiklar
│   └── orderApi.js         # CRUD för ordrar
├── components/             # Reusabla komponenter
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── LoadingState.jsx
│   ├── PageHeader.jsx
│   └── ProtectedRoute.jsx  # Skyddar routes som kräver inloggning
├── context/
│   └── AuthContext.jsx     # Global auth-state med JWT-hantering
├── layout/
│   └── MainLayout.jsx      # AppBar, navigation och footer
├── pages/
│   ├── HomePage.jsx
│   ├── CategoriesPage.jsx
│   ├── MenuItemsPage.jsx
│   ├── OrdersPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── App.jsx                 # Routes och ThemeProvider
├── main.jsx                # App-entry med BrowserRouter och AuthProvider
└── theme.js                # MUI-tema
```

---

## 🛠️ Teknikstack

| Teknologi | Användning |
|-----------|------------|
| **React 19** | UI-ramverk |
| **Vite** | Build-verktyg |
| **MUI (Material UI)** | Design library |
| **Axios** | HTTP-klient |
| **React Router DOM** | Klientside-routing |
| **LocalStorage** | JWT-tokenlagring |

---

## 🚀 Kom igång

### Förutsättningar
- Node.js
- Backend API igång på `https://localhost:7134`

### Installation

**1. Klona repositoryt**
```bash
git clone https://github.com/youabd123/restaurant-system-client.git
cd restaurant-system-client
```

**2. Installera beroenden**
```bash
npm install
```

**3. Starta appen**
```bash
npm run dev
```

**4. Öppna i webbläsaren**

Navigera till `http://localhost:5173`

---

## 🔐 Autentisering

1. Gå till `/register` och skapa ett konto
2. Logga in via `/login` — JWT-token sparas i localStorage
3. Ordrar-sidan kräver inloggning — omdirigeras annars till `/login`
