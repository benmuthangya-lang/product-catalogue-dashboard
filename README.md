# Product Catalogue Dashboard

A polished, responsive catalogue dashboard built as a freelance portfolio project. It loads demo products from the [DummyJSON Products API](https://dummyjson.com/docs/products) and lets visitors search, filter, sort, browse, and inspect product details.

## Features

- Responsive product grid for mobile, tablet, and desktop
- Compact introductory area that brings the catalogue controls closer to the top
- Full-dataset search and category filtering that work together
- Sorting by product name, price, and rating
- Client-side pagination with 12 products per page
- Named native product details dialog with Escape-to-close and focus restoration
- Loading skeletons, an empty state, and an error state with a working Retry action
- HTTP error handling and request cancellation with `AbortController`
- Product response validation that routes incomplete or invalid data to the Retry state
- Visible keyboard focus, improved text contrast, and explicit out-of-stock labels
- Lazy-loaded product imagery and reduced-motion support
- Clear labels showing that all products are demo data
- Relative production asset paths for GitHub Pages compatibility

## Tech stack

- React
- Vite
- JavaScript
- Plain CSS
- Native Fetch API

No UI kits, routing packages, data libraries, or other runtime dependencies are used.

## Run locally

Prerequisites: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

To create and inspect a production build:

```bash
npm run lint
npm run build
npm run preview
```

## API integration

The request logic lives in `src/api/products.js`. The app requests the full catalogue from:

```text
https://dummyjson.com/products?limit=0
```

Downloading the collection once is intentional: combined searching and category filtering can then run against the complete dataset before sorting and pagination. `useProducts` owns loading/error state, aborts in-flight requests on retry, and cancels the active request when the app unmounts.

Before accepting the response, the API layer checks each product's identity, title, category, price, rating, and stock, along with optional fields used by the interface. If those fields are invalid, the dashboard shows its error message and Retry action instead of rendering an incomplete product.

DummyJSON is a public demo API. Product names, images, availability, prices, and other catalogue details are sample data and are not real shop listings.

## Project structure

```text
src/
├── api/products.js          # Fetch request and response validation
├── hooks/useProducts.js     # Request lifecycle and cancellation
├── components/              # Reusable controls, cards, dialog, and states
├── App.jsx                  # Filtering, sorting, pagination, and composition
├── main.jsx                 # React entry point
└── styles.css               # Responsive visual system and component styles
```

## Deploy to GitHub Pages

Vite is configured with a relative `base` path, so the output works under a repository subpath.

1. Push this project to a GitHub repository.
2. Run `npm run build`.
3. In **Settings → Pages**, set the source to **GitHub Actions**.
4. Push to `main`. The included `.github/workflows/deploy.yml` workflow installs, builds, and deploys the `dist/` directory.

For a manual branch deployment, the `gh-pages` package can also publish the build output without changing the app configuration.
