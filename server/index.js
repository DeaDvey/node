const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = requre("cors")
const port = 3000

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())
