import mysql, { Pool } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: Pool | undefined;
}

export function getDb(): Pool {
  if (!globalThis._mysqlPool) {
    globalThis._mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || "51.79.229.154",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "ashastd24",
      password: process.env.DB_PASSWORD || "T%va(oyL[anE",
      database: process.env.DB_NAME || "ashastd24_photography",
      waitForConnections: true,
      connectionLimit: 15,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 10000,
    });
  }
  return globalThis._mysqlPool;
}

