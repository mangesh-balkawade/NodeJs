const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/search-api/:searchTerm", async (req, res) => {
    try {
        let { searchTerm } = req.params;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://newsapi.org/v2/everything?q=${searchTerm}&from=2024-04-05&to=2024-04-05&sortBy=popularity&apiKey=4285a4006a154a5a8f337ce137f9fe3d`,
            headers: {}
        };

        let response = await axios.request(config);
        let cnt = 0;
        for (let art of response.data.articles) {
            if (art?.source?.name?.includes(searchTerm)) {
                console.log("source", searchTerm, cnt);
            }
            if (art?.content?.includes(searchTerm)) {
                console.log("content", searchTerm, cnt);
            }
            if (art?.description?.includes(searchTerm)) {
                console.log("description", searchTerm, cnt);
            }
            if (art?.title?.includes(searchTerm)) {
                console.log("title", searchTerm, cnt);
            }
            if (art?.author?.includes(searchTerm)) {
                console.log("author", searchTerm, cnt);
            }
            cnt++;
        }
        return res.status(200).json({ data: response.data }
        );

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Unable tO Search "
        });
    }
})

app.listen(3000, () => {
    console.log("Server On");
});

