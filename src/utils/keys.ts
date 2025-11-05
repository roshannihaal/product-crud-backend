import forge from "node-forge";
import path from "path";
import fs from "fs";

if (!fs.existsSync("keys")) {
  fs.mkdirSync("keys", { recursive: true });
}
export const generateKeys = () => {
  const keys_dir = path.join(process.cwd(), "keys");
  const private_key_path = path.join(keys_dir, "private_key.pem");
  const public_key_path = path.join(keys_dir, "public_key.pem");

  if (fs.existsSync(private_key_path) && fs.existsSync(public_key_path)) {
    console.log("Skipping key generation");
    return;
  }
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

  const private_key_pem = forge.pki.privateKeyToPem(privateKey);
  const public_key_pem = forge.pki.publicKeyToPem(publicKey);

  fs.writeFileSync(private_key_path, private_key_pem);
  fs.writeFileSync(public_key_path, public_key_pem);
  console.log("Keys generated");
};
