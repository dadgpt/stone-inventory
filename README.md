# Stone Inventory Prototype

This repository contains a Node/Express API and a React (Vite) client that demonstrate a fictional stone inventory experience. Data is seeded from `data/mockInventory.json` and can be refreshed or modified through the prototype admin tooling. Nothing is persisted between restarts.

## Getting started

```bash
# install root dependencies (server utilities)
npm install

# install client dependencies
cd client
npm install
```

### Development

In separate terminals run:

```bash
# Terminal 1 - start the API (defaults to http://localhost:5000)
npm run server

# Terminal 2 - start the React dev server (http://localhost:5173)
npm run client
```

The client automatically targets `http://localhost:5000` via `client/.env`. Adjust `VITE_API_BASE_URL` if you change the API port.

### Production preview

```bash
# build the React app
npm run client:build

# start the API (which will serve the built client from client/dist)
npm run server
```

## API overview

- `GET /api/inventory` — list with support for `search`, `location`, `type`, `status`, `tier`, `color`, `page`, `pageSize`.
- `GET /api/inventory/:id` — retrieve a single slab.
- `POST /api/inventory` — add an in-memory item.
- `PUT /api/inventory/:id` — update an existing item.
- `DELETE /api/inventory/:id` — remove an item.
- `POST /api/refresh` — reload the JSON seed file into memory.

## Frontend features

- Live filters, quick KPI strip, and paginated inventory table.
- Detail panel with gallery fallback, material specs, metrics, and notes.
- Admin sandbox for quick status updates and creating new records (in-memory).

The visuals are intentionally lightweight to highlight the data interactions.
