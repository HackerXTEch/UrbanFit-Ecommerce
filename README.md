# UrbanFit — React + Vite E‑commerce Prototype

This repository contains the UrbanFit storefront: a React + Vite single-page app with a small Express backend used for user authentication, product data, and orders. It is intended as a learning/demo project and includes a minimal SQLite-backed auth database and REST API.

Contents in this README:
- Project overview
- Quick start (install & run)
- Available scripts
- Backend API reference
- Database and persistence
- Common troubleshooting (auth connection errors)
- Development notes and contributions

---

## Project overview

- Frontend: React 18 + Vite, client-side routing with `react-router-dom`, HMR via Vite.
- Backend: Express (Node) providing simple REST endpoints for authentication and product/order data.
- Database: SQLite file used for authentication (`server/auth.db`) and a separate products store under `server`.
- Purpose: demonstration of a small full-stack flow (register → login → use protected routes) for an e-commerce UI.

Key folders:
- `src/` — React app source (components, pages, context providers)
- `server/` — Express API and SQLite helpers (`index.js`, `db.js`, `productsDb.js`, `ordersDb.js`)
- `public/` — static public assets

---

## Quick start (local development)

Prerequisites:
- Node.js (>= 18 recommended)
- npm (comes with Node)

1) Install dependencies

```bash
npm install
```

2) Start the backend server (Express + SQLite)

```bash
npm run start:server # same terminal m? nhi alag me lekin dono.. waps likho  jab new jagah run krna ho like new laptop pe to isko run krna hoga taki database wagerah ban jaye bas lekin abhi ke liye ye ban gaya hai...mere ko run krne ka jaroot h waps?    nhi
```

This runs `node server/index.js` and listens by default on `http://localhost:3001`.

3) Start the frontend dev server

```bash
npm run dev
```

4) Open the app in your browser (default Vite host printed in terminal, usually `http://localhost:5173`).

Notes:
- The backend will create `server/auth.db` and apply schema migrations automatically the first time it runs.
- If you encounter a connection error when registering or logging in from the client, make sure the backend is running (see Troubleshooting below).

---

## Available npm scripts

- `npm run dev` — start the Vite dev server (frontend)
- `npm run build` — build the frontend for production
- `npm run preview` — preview the production build locally
- `npm run start:server` — start the Express backend (server/index.js)
- `npm run lint` — run ESLint

---

## Backend API (summary)

Base URL: `http://localhost:3001`

Authentication
- `POST /register` — register a new user
	- Body (JSON): `{ fullName, email, phone, profilePic?, password }`
	- Responses: `200` success with user id; `409` if email already exists; `400` for validation errors

- `POST /login` — authenticate an existing user
	- Body (JSON): `{ email, password }`
	- Responses: `200` success with user info; `401` invalid credentials; `400` missing fields

- `POST /change-password` — update password
	- Body (JSON): `{ email, currentPassword, newPassword }`

Health
- `GET /health` — returns basic server health status

Products
- `GET /api/products` — list all products
- `GET /api/products/featured` — featured products
- `GET /api/products/id/:id` — single product by id
- `GET /api/products/:type` — products for `men|women|kids` (optional `?category=` query)

Orders
- `POST /orders` — create an order
- `GET /orders/user/:userId` — orders by user id
- `GET /orders/email/:email` — orders by email
- `GET /orders/:orderId` — single order
- `PUT /orders/:orderId/cancel` — cancel an order (business rules apply)

For implementation details, see `server/index.js` and the DB helper modules in `server/`.

---

## Database and persistence

- Auth data is stored in an SQLite file at `server/auth.db` (created automatically).
- Schema and access helpers are in `server/db.js` (`createUser`, `getUserByEmail`, `updateUserPassword`).
- Products and orders use helper modules `server/productsDb.js` and `server/ordersDb.js`.

Important: the repository includes code that will ALTER the `users` table to add columns (`full_name`, `phone`, `profile_pic`) if they are missing. The `password_hash` column is used to store bcrypt-hashed passwords.

---

## Troubleshooting — "connection error" on register/login

If the UI shows a network/connection error when trying to register or login, follow these checks:

1) Is the backend running?
	 - Run:
		 ```bash
		 npm run start:server
		 ```
	 - Confirm you see `Server listening on http://localhost:3001` in the backend terminal.

2) Can you reach the health endpoint?
	 - In a separate terminal:
		 ```bash
		 curl http://localhost:3001/health
		 ```
	 - You should receive JSON like `{ "status": "ok", "time": "..." }`.

3) Check the browser DevTools → Network tab when submitting the login/register form. Inspect:
	 - Request URL (should be `http://localhost:3001/register` or `/login`)
	 - Response status and body
	 - If the request is blocked by CORS or the server is unreachable, you will see network errors.

4) Look at the server console logs. The server prints helpful messages from `server/index.js` and `server/db.js` (database connection, register/login logs, error stacks).

5) Common fixes:
	 - Start the backend if it is stopped.
	 - Ensure no other process occupies port `3001`.
	 - If using a different host or Docker, update the frontend base URL (`http://localhost:3001`) in the client code (search `const API =` or `http://localhost:3001` in `src/` files).

---

## Development notes

- Authentication is intentionally minimal for the project: passwords are hashed with `bcryptjs` and responses return basic user info. There is no JWT/session store in this demo.
- To add production-ready authentication, implement JWT or sessions, HTTPS, input validation, rate limiting, and stronger password policies.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run and test locally
4. Open a pull request with a clear description

---

## License

This project is provided for educational purposes. Adjust the license header as needed for your use.

---

If you'd like, I can also:
- add a short `DEVELOPMENT.md` with run/debug tips,
- update the client to surface more descriptive server errors, or
- run a quick end-to-end test of register/login now and report results.
