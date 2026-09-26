import multer from 'multer';

/**
 * Upload de PDF em memória (sem gravar em disco).
 * Limite de 20 MB por arquivo.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter(_req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Apenas arquivos PDF são aceitos'), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
