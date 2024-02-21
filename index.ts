require('dotenv').config();

import express from 'express';

const connectToDatabase = require("./src/db")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


connectToDatabase();

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


