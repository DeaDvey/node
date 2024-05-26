const blogs = require("/srv/www/htdocs/blog/blogs.js")
const fs = require("fs")
const reviews = fs.readFileSync("/home/max/node/index.html")

console.log(reviews)
