import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import forge from "node-forge";

export const decrypt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const keys_dir = path.join(process.cwd(), "keys");
    const private_key_path = path.join(keys_dir, "private_key.pem");

    const privateKeyPem = fs.readFileSync(private_key_path, "utf8");
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    const encryptedData = req.body;

    const decryptedData: { [key: string]: string } = {};

    Object.keys(encryptedData).forEach((key) => {
      decryptedData[key] = privateKey.decrypt(
        forge.util.decode64(encryptedData[key]),
        "RSAES-PKCS1-V1_5"
      );
    });

    req.body = decryptedData;

    next();
  } catch (err) {
    next(err);
  }
};
