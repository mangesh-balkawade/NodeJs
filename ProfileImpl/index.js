const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const profile = require("./profile");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      req.emailId = "mangeshbalkawade07@gmail.com";
      console.log(file);
      const filename = `${req.emailId}.jpg`;
      console.log(req.emailId);
      cb(null, filename);
    },
  }),
}).single("profileImage");

app.post("/saveImg", upload, (req, res) => {
  // Define the path to the images folder
  const imagesFolder = path.join(__dirname, "uploads/");
  console.log(imagesFolder);

  // Read all the files in the images folder
  fs.readdir(imagesFolder, async (error, files) => {
    if (error) {
      console.error(error);
      return;
    }

    // Find the file that matches the name
    const fileNameToFind = req.emailId + ".jpg";
    const matchingFile = files.find((fileName) => fileName === fileNameToFind);

    if (!matchingFile) {
      console.error(`File ${fileNameToFind} not found in ${imagesFolder}`);
      return;
    }

    // Save the matching file to the database
    const filePath = path.join(imagesFolder, matchingFile);
    const imageData = fs.readFileSync(filePath);

    try {
      await profile.create({
        firstName: "Mangesh",
        lastName: "Balkawade",
        profileImage: imageData,
      });
      console.log(`Saved ${matchingFile} to the database`);
      fs.unlinkSync(filePath);
      res.send("file save to database");
    } catch (error) {
      console.error(error);
      res.send(err);
    }
  });
});

app.get("/getFile", async (req, res) => {
  let data1 = await profile.findOne({
    where: {
      firstName: "Mangesh",
    },
  });
  const base64Image = data1.profileImage.toString("base64");
  const profileData = {
    firstName: "Magesh",
    profileImage: `data:image/jpeg;base64,${base64Image}`,
  };
  res.send(profileData);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
