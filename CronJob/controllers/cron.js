const cron = require("node-cron");
const fs = require('fs').promises;
const path = require('path');

// Scheduling the cron job for fetching data from Connect and storing it in the leads table
// minute, hour, day of the month, month, and day of the week
// 5.30 Hours Behind Our Current Time For Dev

// 0: Specifies the minute (0 - 59).
// 3: Specifies the hour (0 - 23), representing 3 AM.
// *: Represents any day of the month.
// *: Represents any month.
// 1: Represents Monday (days of the week are represented by numbers 0-6, where Sunday is 0 and Saturday is 6).
// cron.schedule("0 3 * * 1", async () => {
cron.schedule("31 12 * * 3", async () => {
    try {
        console.log("cron started");
        let deletedFiles = await deleteFilesInFolder();
        console.log(deletedFiles);
    } catch (error) {
        console.log(error);
    }
});

async function deleteFilesInFolder() {
    const folderPath = path.join(__dirname, '../finalVideo');
    try {
        // Read the contents of the folder
        const files = await fs.readdir(folderPath);
        let filesDeleted = [];

        // Iterate through each file and remove it
        for (const file of files) {
            if (file !== 'test.pdf') {
                const filePath = path.join(folderPath, file);
                // Remove the file
                await fs.unlink(filePath);
                console.log('File deleted:', filePath);
                filesDeleted.push(file);
            }
            console.log(file, "file");
        }

        console.log('All files deleted in the folder.');
        return filesDeleted;
    } catch (err) {
        console.error('Error:', err);
    }
}


