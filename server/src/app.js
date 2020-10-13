const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
.use(morgan("tiny"))
.use(bodyParser.json())
.use(cors())
.use(require("./routes/auth"))

.listen(4200, () => {
    console.log('Server is now listening on port 3000.')
});