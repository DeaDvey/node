const fs = require('fs/promises');
const blogs = require("/srv/www/htdocs/blog/blogs.js")
const searchJsonPath = "/srv/www/htdocs/search/list.json"

let listText = "[\n"

console.log(blogs)

for (let length = 0; length < blogs.length; length++) {
    console.log(length)
    console.log(blogs[length][4])
    listText+= `     {
        "id": ${length},
        "name": "${blogs[length][0]}",
        "tags": "${blogs[length][4]}",
        "link": "/blog/blogs/${length}.html"
     }`
    if (length != blogs.length - 1) {
         listText += ",\n"
    }
}
 listText += "\n]"

console.log(listText)

fs.writeFile(searchJsonPath, listText , (err) => {
   if (err) {
      console.error("Error writing to file:", err);
   } else {
      console.log("File successfully written to: ", searchJsonPath)
   }
});
