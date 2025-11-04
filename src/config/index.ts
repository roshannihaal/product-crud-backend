import "dotenv/config";
import { configSchema } from "./config.schema";

export const config = configSchema.parse(process.env);
