const express = require('express');
const app = express();
const port = 3000
const path = require("path")
//let comments = require("/srv/www/htdocs/blog/comments.js")
const fs = require("fs")
const validator = require('validator');
const rootPath = "/srv/www/htdocs/"

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post("/blog/submit-comment",(req,res) => {
    let jsonString = fs.readFileSync('/srv/www/htdocs/blog/comments-database.js', 'utf8');
    let comments = JSON.parse(jsonString);
    res.redirect(302, req.get("referer")); 
    console.log(req.get("referer"))
    console.log(req.body.name)
    if (req.body.name != "" && req.body.comment !="") {
	comments[req.body.pageID].push([validator.escape(escapeHtml(req.body.name)),validator.escape(escapeHtml(req.body.comment))])
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
	const jsonString = JSON.stringify(comments);
	fs.writeFileSync('/srv/www/htdocs/blog/comments-database.js', jsonString, 'utf8'); 
    }
    console.log(comments) 
});

app.use(express.static(rootPath)); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running at 
http://localhost:${port}
in directory: ${rootPath}`);
}); 
