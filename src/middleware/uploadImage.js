const Multer = require("multer");

const uploadSingleImage = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    console.log(file.mimetype)
    let allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo do arquivo inválido"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = uploadSingleImage.single("image");