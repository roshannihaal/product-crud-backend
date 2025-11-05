import { NextFunction } from "express";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import multer from "multer";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const randomName = crypto.randomUUID();
      cb(null, `${randomName}${ext}`);
    },
  }),
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const validator = /\.(jpg|jpeg|png)$/i;
    if (!validator.test(file.originalname)) {
      return cb(
        new Error("Invalid file type. Only .jpg, .jpeg, .png are allowed.")
      );
    }
    cb(null, true);
  },
});
