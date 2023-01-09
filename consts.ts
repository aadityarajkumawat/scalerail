export const __is_prod__ = process.env.NODE_ENV === "production";
export const API_URL = __is_prod__
  ? `${process.env.VERCEL_URL}/api`
  : "http://localhost:3000/api";
