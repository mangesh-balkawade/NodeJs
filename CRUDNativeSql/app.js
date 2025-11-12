const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server Is Runnning");
});

let connection = require("./db");

let tableName = "User"

app.post("/save", async (req, res) => {
    try {
        let user = {
            name: "Mangesh",
            age: 20
        }

        let sql = `Insert Into ${tableName} Set ?`;
        let response = await connection.query(sql, user);
        console.log(response);
        return res.status(201).json({ message: "Saved Data" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Not Save" })
    }
});

app.get("/get", async (req, res) => {
    try {

        let sql = `Select * From  ${tableName} `;
        let response = await connection.query(sql);
        console.log(response);
        return res.status(201).json({ message: "Get Data", response });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Not Get" })
    }
});

app.patch("/update", async (req, res) => {
    try {
        let user = {
            name: "Mangu",
            age: 24
        }

        let name = "0";
        let sql = `Update ${tableName} Set ? where name=?`;
        let response = await connection.query(sql, [user, name]);
        console.log(response);
        return res.status(201).json({ message: "Update Data" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Not Update" })
    }
});


app.delete("/delete", async (req, res) => {
    try {

        let name = "Mangu";
        let sql = `Delete From  ${tableName}  where name=${name}`;
        let response = await connection.query(sql);
        console.log(response);
        return res.status(201).json({ message: "Delete Data", response });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Not Delete" })
    }
});
