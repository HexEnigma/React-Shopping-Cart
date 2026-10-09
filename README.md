# ShopEasy – React Shopping Cart

A responsive shopping cart built with React (Vite) and the Context API.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-c94e2a?style=for-the-badge)](https://react-shopping-cart-pi-three.vercel.app/)

## Features
- Product grid with image, title, category and price
- Search and category filter
- Add to cart, increase/decrease quantity, remove items, clear cart
- Live total item count and total price
- Cart persists in localStorage
- Mobile-first responsive layout

## Run locally
npm install
npm run dev

## Build
npm run build

## Structure
- `src/components` reusable UI components
- `src/context` cart state (Context API + useReducer)
- `src/data` mock products
- `src/hooks` custom `useCart` hook
- `src/utils` price formatter