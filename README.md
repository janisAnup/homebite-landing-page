# HomeBite — React + Express

HomeBite is a responsive homemade-meal marketplace built for Lab Exercises 5 and 6. The React client preserves the original warm orange HomeBite theme while the Express API provides role-based authentication and complete meal CRUD.

## Stack

- React 19, JSX, React Router, Vite
- Express 5 with JSON-file models
- Cookie-based sessions and role-protected routes
- Tailwind CDN utility styling, localStorage, and browser APIs

## React architecture

```text
src/client/
├── context/AuthContext.jsx   # Authentication and role state via Context API
├── hooks/useMeals.js         # Reusable loading/error-aware API hook
├── services/api.js           # Fetch client
├── utils/formatters.js       # Currency and image utilities
├── main.jsx                  # Router, reusable UI components, and pages
└── api.js                    # Compatibility re-export
src/
├── controllers/              # Express authentication and meal controllers
├── middleware/               # Authentication, roles, error handling
├── models/                   # JSON storage models
└── routes/                   # API route definitions
```

## Lab requirements covered

- Functional JSX components: `Navbar`, `Footer`, `MealCard`, `MealList`, `MealForm`, dashboards, and auth pages.
- React Router navigation and protected customer/home-cook routes.
- `useState`, `useEffect`, Context API (`AuthProvider`/`useAuth`), and custom `useMeals` hook.
- Controlled login, registration, filter, radio, select, search, and CRUD forms with validation.
- Conditional rendering, mapped meal/order lists, API loading/error states, PropTypes validation, and confirmation feedback.
- Create, read, update, and delete meal listings through the existing Express `/api/meals` API.
- Browser APIs: localStorage favourites/order history, Geolocation, Notifications, Clipboard, FileReader image upload, and draggable meal cards.

## Run

Install dependencies once:

```bash
npm install
```

For development, run both the Express API and Vite client together:

```bash
npm run dev
```

Vite serves the React client on its displayed URL and proxies `/api` calls to the Express API on port 3000. Use `Ctrl+C` once to stop both services. If you prefer separate terminals, run `npm start` for the API and `npm run vite` for the client.

For a production-style local run:

```bash
npm run build
npm start
```

Open `http://localhost:3000`.

## Roles

- **Customer:** browse, search/filter, favourite, order, and use Smart Meal Match.
- **Home Cook:** create, view, edit, and delete personal meal listings, including optional image uploads.
