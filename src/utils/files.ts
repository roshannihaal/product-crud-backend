import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ICSVSchema } from "../schemas";

export const writeCSV = async (data: ICSVSchema[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!data.length) return resolve("");

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const filename = `${crypto.randomUUID()}.csv`;
    const filepath = path.join(uploadsDir, filename);
    const headers = Object.keys(data[0]);

    const writeStream = fs.createWriteStream(filepath);
    writeStream.write(headers.join(",") + "\n");

    for (const obj of data) {
      const row = headers
        .map((header) => {
          const value = obj[header as keyof typeof obj];
          return value ?? "";
        })
        .join(",");

      writeStream.write(row + "\n");
    }

    writeStream.end();

    writeStream.on("finish", () => resolve(filepath));
    writeStream.on("error", reject);
  });
};
