import { config } from "dotenv";

config();

export const PORT = Number.parseInt(`${process.env.PORT}`);
export const DBNAME = `${process.env.DBNAME}`;
export const __DEV__ = process.env.NODE_ENV != "production";

export const GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
export const GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`;

export const GITHUB_CLIENT_ID = `${process.env.GITHUB_CLIENT_ID}`;
export const GITHUB_CLIENT_SECRET = `${process.env.GITHUB_CLIENT_SECRET}`;

export const FACEBOOk_CLIENT_ID = `${process.env.FACEBOOk_CLIENT_ID}`;
export const FACEBOOk_CLIENT_SECRET = `${process.env.FACEBOOk_CLIENT_SECRET}`;

export const CLIENT_URL = "http://localhost:3000/";
