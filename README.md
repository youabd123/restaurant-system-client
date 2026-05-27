# 🍽️ Trattoria — Restaurant System Client

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![MUI](https://img.shields.io/badge/MUI-Material_UI-007FFF?style=for-the-badge&logo=mui)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge)
![Router](https://img.shields.io/badge/React_Router-DOM-CA4245?style=for-the-badge&logo=reactrouter)
![Auth](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)
![State](https://img.shields.io/badge/State-Context_API-61DAFB?style=for-the-badge&logo=react)
![Lang](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
> React-frontend för Trattoria Restaurant System.
> Byggd med **Vite**, **MUI** och **React Router** med JWT-autentisering, rollbaserad åtkomstkontroll och ett komplett restaurangflöde från meny till order.

---

## 📂 Projektstruktur

```text
src/
├── api/                        # Axios-klient och API-anrop
│   ├── axiosClient.js          # Bas-klient med JWT-interceptor
│   ├── authApi.js              # Login och registrering
│   ├── categoryApi.js          # CRUD för kategorier
│   ├── menuItemApi.js          # CRUD för menyartiklar
│   └── orderApi.js             # CRUD för ordrar
├── components/                 # Återanvändbara komponenter
│   ├── BookingModal.jsx        # Bordsbokningsmodal
│   ├── EmptyState.jsx          # Visas när data saknas
│   ├── ErrorState.jsx          # Felmeddelande-komponent
│   ├── LoadingState.jsx        # Laddningsindikator
│   ├── PageHeader.jsx          # Återanvändbar sidtitel
│   ├── ProtectedRoute.jsx      # Skyddar routes med roll-stöd
│   └── ScrollToTopButton.jsx   # Tillbaka-upp-knapp
├── context/                    # Global state
│   ├── AuthContext.jsx         # JWT-autentisering och användarroll
│   ├── BasketContext.jsx       # Varukorg
│   └── BookingContext.jsx      # Bokningsmodal-state
├── Helpers/                    # Hjälpfunktioner
│   ├── formatDate.js           # Formaterar datum till svenska
│   └── formatPrice.js          # Formaterar pris med kr
├── Hooks/                      # Custom hooks
│   ├── useCategories.js        # Hämtar kategorier från API
│   ├── useMenuItems.js         # Hämtar menyartiklar från API
│   └── useOrders.js            # Hämtar ordrar beroende på roll
├── layout/
│   └── MainLayout.jsx          # Navbar, footer och öppet-indikator
├── pages/
│   ├── HomePage.jsx            # Startsida med hero, stats och recensioner
│   ├── AboutPage.jsx           # Om restaurangen och kökschefen
│   ├── ContactPage.jsx         # Adress, öppettider och karta
│   ├── CategoriesPage.jsx      # Asymmetrisk kategorigrid
│   ├── MenuItemsPage.jsx       # Meny med sök, filter och allergimärkning
│   ├── CheckoutPage.jsx        # Varukorg och orderflöde med animation
│   ├── OrdersPage.jsx          # Orderhistorik med rollbaserad visning
│   ├── LoginPage.jsx           # Inloggning
│   ├── RegisterPage.jsx        # Registrering
│   ├── ProfilePage.jsx         # Användarprofil
│   └── NotFoundPage.jsx        # 404-sida
├── App.jsx                     # Routes och ThemeProvider
├── main.jsx                    # App-entry med BrowserRouter och providers
└── theme.js                    # MUI-tema
```

---

## 🛠️ Teknikstack

| Teknologi | Användning |
|-----------|------------|
| **React 19** | UI-ramverk |
| **Vite** | Build-verktyg |
| **MUI (Material UI)** | Designbibliotek |
| **Axios** | HTTP-klient med JWT-interceptor |
| **React Router DOM** | Klientside-routing |
| **LocalStorage** | JWT-tokenlagring |
| **Context API** | Global state för auth, varukorg och bokning |
| **Intersection Observer** | Fade-in animationer på menysidan |

---

## 🚀 Kom igång

### Förutsättningar
- Node.js installerat
- Backend API igång (se backend-repositoryt)

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

**3. Konfigurera API-URL**

Öppna `src/api/axiosClient.js` och sätt rätt URL till backend:
```js
baseURL: 'http://localhost:5037/api'
```

**4. Starta appen**
```bash
npm run dev
```

**5. Öppna i webbläsaren**

Navigera till `http://localhost:5174`

---

## 🔐 Autentisering och roller

Appen har två roller — **Admin** och **User**.

| Funktion | User | Admin |
|----------|------|-------|
| Bläddra i menyn | ✅ | ✅ |
| Lägga order | ✅ | ✅ |
| Se sin egen orderhistorik | ✅ | ✅ |
| Se alla ordrar | ❌ | ✅ |
| Ändra orderstatus | ❌ | ✅ |

---

## ✨ Features

- **Startsida** — Hero, animerade räknare, utvalda rätter och kundrecensioner
- **Meny** — Sök, filtrera på kategori, sortera på pris, allergimärkning och "Kockens val"-badge
- **Varukorg** — Uppdateras live, töm varukorg, animerat orderflöde med steg-för-steg bekräftelse
- **Ordrar** — Admin ser alla ordrar och kan ändra status, kund ser bara sina egna
- **Boka bord** — Modal med formulär direkt i navbaren
- **Om oss & Kontakt** — Restaurangens historia, kökschef, adress och öppettider
- **Öppet-indikator** — Grön/röd prick i navbaren baserat på aktuell tid
- **404-sida** — Visas vid felaktig URL
