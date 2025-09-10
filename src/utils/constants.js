export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

export const LOGO_URL =
  "https://static.vecteezy.com/system/resources/previews/001/936/506/non_2x/chef-girl-smiling-happy-and-cooking-with-love-in-her-kitchen-vector.jpg";

export const IS_LOCAL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1");

export const PROXY_BASE = "https://flavorfiesta-proxy.onrender.com";

// export const LIST_API = IS_LOCAL
//   ? "http://localhost:5174/api/restaurants"
//   : `${PROXY_BASE}/api/restaurants`;

// export const Menu_API = IS_LOCAL
//   ? "http://localhost:5174/api/menu?resId="
//   : `${PROXY_BASE}/api/menu?resId=`;

// // Per-restaurant mock JSONs served by the proxy
// export const PROXY_MOCK_BASE = IS_LOCAL
//   ? "http://localhost:5174/mock/menus/"
//   : `${PROXY_BASE}/mock/menus/`;


export const LIST_API = `${PROXY_BASE}/api/restaurants`;
export const Menu_API = `${PROXY_BASE}/api/menu?resId=`;
export const PROXY_MOCK_BASE = `${PROXY_BASE}/mock/menus/`;
