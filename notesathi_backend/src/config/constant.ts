import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8088;
export const MOCK = process.env.MOCK_DB || "mock";
export const MONGODB_URI = process.env.MONGODB_URI;

export const SECRET_KEY = process.env.SECRET_KEY || "merosecretjwtkey";

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
