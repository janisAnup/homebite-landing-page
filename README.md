# HomeBite — React + Express

HomeBite is a responsive homemade-meal marketplace built for Lab Exercises 5–8. The React client preserves the original warm orange HomeBite theme while the Express API provides role-based authentication, SQLite-backed meal CRUD, and secure Node.js file-system operations.

## Stack

- React 19, JSX, React Router, Vite
- Express 5, CORS, and SQLite (`database/homebite.db`) for the Meal Management module
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
- Node.js FS module via `/api/files`: create, read, update/write, append, rename, and delete HomeBite domain-detail `.txt` files. The React interface is at `/fs-lab`.
- SQLite REST endpoints with path parameters and query filtering: `GET /api/meals/:id` and `GET /api/meals?cuisine=Indian&diet=Veg&maxPrice=250`.

## Exercise 7 and 8 verification

`API_TESTING.md` gives ready-to-run Postman/Thunder Client calls for every required API operation. The SQLite database is created automatically the first time the server starts and is seeded from the project's existing meal data when available.

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
