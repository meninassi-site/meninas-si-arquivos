import multer from "multer";

// Files are buffered in memory and written straight into the BLOB/MEDIUMBLOB
// column — there is no filesystem storage for uploaded images.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB, the ceiling for MEDIUMBLOB; MySQL itself rejects BLOB overflow (see errorHandler).
  fileFilter(_req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      callback(new Error("Apenas arquivos de imagem são aceitos."));
      return;
    }
    callback(null, true);
  },
});
