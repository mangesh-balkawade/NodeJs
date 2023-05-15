// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const AWS = require("aws-sdk");
// const multer = require("multer");
// const fs = require("fs");
// const util = require("util");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());

// const s3key = "AKIARBBLOMCNUBC2T3V7";
// const s3seret = "NK7Dt8GywNORBjI2w0tm2K9JKJHspQ5/zsEl2/vj";
// const s3region = "ap-south-1";
// const s3Bucket = "hurtyhelperprofileimages";

// function s3Connection() {
//   AWS.config.update({
//     accessKeyId: s3key,
//     secretAccessKey: s3seret,
//     region: s3region,
//   });

//   const s3 = new AWS.S3();
//   return s3;
// }

// const s3 = s3Connection();
// const putObject = util.promisify(s3.putObject.bind(s3));

// async function saveImagesToS3(req, res) {
//   const fileContent = fs.readFileSync(req.file.path);

//   const params = {
//     Bucket: s3Bucket,
//     Key: req.emailId + ".jpg",
//     Body: fileContent,
//   };
//   try {
//     await putObject(params);
//     const url = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${params.Key}`;
//     fs.unlinkSync(req.file.path);
//     return url;
//   } catch (err) {
//     res.status(500).json({
//       error: "Unable to Update Profile",
//     });
//   }
// }

// const upload = multer({ dest: "uploads/" });

// module.exports = {
//   upload,
//   saveImagesToS3,
// };

// app.post("/upload", upload.single("profileImage"), async (req, res) => {
//   try {
//     if (!req.file) {
//       let new_user = await profile.create({
//         name: "no image",
//       });
//       return res.send(new_user);
//     }
//     let urls = await saveImagesToS3(req, res);
//     let new_user = await profile.create({
//       name: "mangesh",
//       profileImage: urls,
//     });
//     res.json(new_user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// });
// app.listen(3000, () => console.log(`Example app listening on port 3000!`));

// ---------------------------working without file saving-------------------------------------------//
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const util = require("util");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const s3key = "AKIARBBLOMCNUBC2T3V7";
const s3secret = "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";
const s3region = "ap-south-1";
const s3Bucket = "hurtyhelperprofileimages";

function s3Connection() {
  AWS.config.update({
    accessKeyId: s3key,
    secretAccessKey: s3secret,
    region: s3region,
  });

  const s3 = new AWS.S3();
  return s3;
}

const s3 = s3Connection();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    key: function (req, file, cb) {
      cb(null, req.emailId + ".jpg");
    },
  }),
});

async function saveImagesToS3(req, res) {
  try {
    const url = `https://${s3Bucket}.s3.${s3region}.amazonaws.com/${req.emailId}.jpg`;
    return url;
  } catch (err) {
    res.status(500).json({
      error: "Unable to Update Profile",
    });
  }
}

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const imageUrl = await saveImagesToS3(req, res);
    res.status(200).json({ imageUrl: imageUrl });
  } catch (err) {
    res.status(500).json({
      error: "Unable to Upload Image",
    });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

//----------- code whcih store the file in uploads folder
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const AWS = require("aws-sdk");
// const multer = require("multer");
// const fs = require("fs");
// const util = require("util");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());

// const s3key = "AKIARBBLOMCNUBC2T3V7";
// const s3seret = "NK7Dt8GywNORBjI2w0tm2K9JKJHspQ5/zsEl2/vj";
// const s3region = "ap-south-1";
// const s3Bucket = "hurtyhelperprofileimages";

// function s3Connection() {
//   AWS.config.update({
//     accessKeyId: s3key,
//     secretAccessKey: s3seret,
//     region: s3region,
//   });

//   const s3 = new AWS.S3();
//   return s3;
// }

// const s3 = s3Connection();
// const putObject = util.promisify(s3.putObject.bind(s3));

// async function saveImagesToS3(req, res) {
//   const fileContent = fs.readFileSync(req.file.path);

//   const params = {
//     Bucket: s3Bucket,
//     Key: req.emailId + ".jpg",
//     Body: fileContent,
//   };
//   try {
//     await putObject(params);
//     const url = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${params.Key}`;
//     fs.unlinkSync(req.file.path);
//     return url;
//   } catch (err) {
//     res.status(500).json({
//       error: "Unable to Update Profile",
//     });
//   }
// }

// const upload = multer({ dest: "uploads/" });

// module.exports = {
//   upload,
//   saveImagesToS3,
// };
