import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config";
import * as schema from "../db";

const connectDB = () => {
  try {
    const queryClient = postgres(config.DATABASE_URL);
    const db = drizzle({ client: queryClient, schema });
    console.log("Connected to the database successfully.");
    return db;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

export const db = connectDB();
