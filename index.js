const express = require('express');
const app = express();
const port = 3001;
const { MongoClient } = require("mongodb");
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const API_KEY = process.env.REACT_APP_API_KEY;
const Cloudinary_user = process.env.CLOUDINARY_USERNAME;
const Cloudinary_pass = process.env.CLOUDINARY_PASSWORD;

const uri =
    `mongodb+srv://${Cloudinary_user}:${Cloudinary_pass}@portfoliocluster.hkjps2j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run() {
    console.log("In run function")
    await client.connect();
    // database and collection code goes here
    const db = client.db("PortfolioData");
    const coll = db.collection("Projects");

    // find code goes here
    const cursor = coll.find();
    return (cursor)
}

app.get('/data/:apiKey', async (req, res) => {
    const apiKey = req.params.apiKey;
    if (apiKey === API_KEY) {
        // handle the request
        console.log('In get data')
        try {
            console.log('In the try')
            const cursor = await run();
            const data = await cursor.toArray();
            console.log(data[0])
            res.send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send('Error getting data from MongoDB');
        }
    } else {
        res.status(401).send('Unauthorized');
    }

});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
