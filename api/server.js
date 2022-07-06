const express = require('express');
const bodyParser = require("body-parser")

const app = express();
const port = 3080;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
});