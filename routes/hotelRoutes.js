// This project uses Next.js App Router route handlers instead of an Express
// server, so /api/hotels routes live in app/api/hotels/*/route.ts.
// If this code is moved into an Express server later, mount equivalent routes
// with app.use("/api/hotels", hotelRoutes).
export const hotelRoutes = {
  places: "/api/hotels/places",
  search: "/api/hotels/search",
};
