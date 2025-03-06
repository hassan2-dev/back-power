import { memoryStorage } from 'multer';

export const multerConfig = {
  storage: memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  preservePath: true,
  fileFilter: (req: any, file: any, cb: any) => {
    // Debug logging
    console.log('Received file:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype
    });
    cb(null, true);
  }
}; 