// const bcrypt = require("bcrypt");

// async function encryptPassword(password) {
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

// async function chkPasswordMatch(incomingPassword, storedHashedPassword) {
//   if (
//     typeof incomingPassword !== "string" ||
//     typeof storedHashedPassword !== "string"
//   ) {
//     return false;
//   }

//   const isPasswordMatch = await bcrypt.compare(
//     incomingPassword,
//     storedHashedPassword
//   );
//   return isPasswordMatch;
// }

// async function main() {
//   let password = "Mangesh@123";
//   let hashedPassword = await encryptPassword(password);
//   console.log(hashedPassword);

//   let isPasswordMatch = await chkPasswordMatch("Mangesh@123", hashedPassword);
//   console.log(isPasswordMatch);

//   let isPasswordMatch2 = await chkPasswordMatch("Shubham", hashedPassword);
//   console.log(isPasswordMatch2);
// }

// main();

const crypto = require("crypto");

async function passendep(password, type = "") {
  return new Promise((resolve, reject) => {
    const algorithm = "aes-192-cbc";

    const password_key = "RPjzxZrP1y18zMU6sbP8FbPO6N1LLg";

    const key = crypto.scryptSync(password_key, "GfG", 24);

    const iv = Buffer.alloc(16, 0);

    if (type == "en") {
      var cipher = crypto.createCipheriv(algorithm, key, iv);
    } else {
      var cipher = crypto.createDecipheriv(algorithm, key, iv);
    }

    let result_output = "";

    if (type == "en") {
      cipher.on("readable", () => {
        let chunk;

        while (null !== (chunk = cipher.read())) {
          result_output += chunk.toString("base64");
        }
      });
    } else {
      cipher.on("readable", () => {
        let chunk;

        while (null !== (chunk = cipher.read())) {
          result_output += chunk.toString("utf8");
        }
      });
    }

    // Handling end event
    cipher.on("end", () => {
      // console.log(result_output,'old');

      return resolve(result_output);
    });

    // Writing data
    if (type == "en") {
      cipher.write(password);
    } else {
      cipher.write(password, "base64");
    }

    cipher.end();
  });
}

async function encryptAndDecrypt() {
  try {

    const password = "myPassword";
    const encryptedPassword = await passendep(password, "en");

    console.log("Encrypted password:", encryptedPassword);

    // Example usage for decryption
    const decryptedPassword = await passendep(password, "de");
    console.log("Decrypted password:", decryptedPassword);
  } catch (error) {
    console.error("Error:", error);
  }
}

encryptAndDecrypt();
