export const __is_prod__ = process.env.NODE_ENV === "production";
export const API_URL = __is_prod__
  ? `https://scalerail.vercel.app/api`
  : "http://localhost:3000/api";
