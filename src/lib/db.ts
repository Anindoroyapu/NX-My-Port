import mysql, { Pool } from "mysql2/promise";

let pool: Pool | null = null;

export function getDb(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "51.79.229.154",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "ashastd24",
      password: process.env.DB_PASSWORD || "T%va(oyL[anE",
      database: process.env.DB_NAME || "ashastd24_photography",
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  }
  return pool;
}
