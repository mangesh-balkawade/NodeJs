// Import required modules
const qr = require("qrcode");
const fs = require("fs");

// Function to generate QR code
async function generateQRCode(link, filename) {
  try {
    // Generate QR code as PNG buffer
    const qrBuffer = await qr.toBuffer(link, {
      type: "png",
      errorCorrectionLevel: "H", // High error correction level
      margin: 1, // Margin around the QR code
      width: 256, // Width of the QR code
      color: { dark: "#000000FF", light: "#FFFFFFFF" }, // Color options
    });

    // Write QR code buffer to file
    fs.writeFileSync(filename, qrBuffer);

    console.log(`QR code generated and saved as ${filename}`);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

// Example usage
const link = "https://sameer-balkawade-wedding.netlify.app/";
const filename = "qrcode.png"; // Change the filename as needed

generateQRCode(link, filename);
