import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';

const createStorageConfig = (subfolder: string) => multer.diskStorage({
  destination: async (req, file, cb) => {
    const destDir = path.join(config.publicPath, subfolder);
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = path.join(randomUUID() + extension);
    cb(null, filename);
  },
});

export const imagesUpload = multer({ storage: createStorageConfig('images') });

export const avatarsUpload = multer({ storage: createStorageConfig('avatars') });
