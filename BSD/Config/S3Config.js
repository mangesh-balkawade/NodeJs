const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3bucket = process.env.S3BucketName;

aws.config.update({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    signatureVersion: 'v4'
});

const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg"
        || file.mimetype === "image/png"
        || file.mimetype === "application/pdf"
        || file.mimetype == "application/vnd.ms-excel"
        || file.mimetype == "text/csv"
        || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: s3bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log('fileuploading in progress')

            // var newFileName = Date.now() + "-" + file.originalname;
            let filename = file.originalname;
            let ext = filename.split('.').pop();
            var newFileName = Date.now() + "-" + Math.floor(Math.random() * 1000) + 1 + "." + ext;
            var fullPath = newFileName;

            cb(null, fullPath); //use Date.now() for unique file keys
        }
    }),
    limits: { fileSize: 1024 * 1024 * 50 }
});

module.exports = upload;