const express = require('express');
const app = express();
const port = 80
const path = require("path")
let comments = require("/srv/www/htdocs/blog/comments.js")
const fs = require("fs")

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post("/blog/submit-comment",(req,res) => {
    res.redirect(302, req.get("referer")); 
    console.log(req.get("referer"))
    console.log(req.body.name)
    console.log(comments)
    comments[req.body.pageID].push([req.body.name,req.body.comment])
    console.log(comments)
    content=`comments=${JSON.stringify(comments)}
if (typeof module !== "undefined" && module.exports) {
                module.exports = comments;     
}`
    fs.writeFile("/srv/www/htdocs/blog/comments.js", content, (err) => {
    if (err) { 
      console.error('Error creating file:', err);  
    } else {
      console.log('File created written: Comments.js'); 
    } 
  });
});

app.use(express.static("/srv/www/htdocs/")); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running at 
http://localhost/
:${port}`);
}); 
