import { diskStorage } from 'multer';
import { resolve, extname } from 'node:path';

export default function(folderName) {
  return ({
    dest: resolve(process.cwd(), 'tmp', 'uploads', folderName),

    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, resolve(process.cwd(), 'tmp', 'uploads', folderName))
      },

      filename: (req, file, cb) => {
        const fileName = Date.now() + extname(file.originalname);

        cb(null, fileName);
      }

    }),

    limits: {
      fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        'image/pjpeg',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];

      if(allowedMimes.includes(file.mimetype)){
        cb(null, true);
      }else {
        cb(new Error('Invalid file type'));
      }
    }

  });
}