const express = require("express")
const app = express()

app.post("/name", function(req, res)) {
	const name = req.body.name
}
