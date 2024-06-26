const pages = require("/srv/www/htdocs/theunderland/wiki/pages.js");
const filePath = "/srv/www/htdocs/theunderland/wiki/list.json";
const fs = require("fs");
const { pageTop, pageBottom } = require("/srv/www/htdocs/html.js")

let content = "["

console.log(pages);
 ////////////////////////////////
// Make each individual blog page
/////////////////////////////////
for (let length = 0; length < pages.length; length++) {
  console.log(length)
  
  content += `{
   "id": 1,
   "name": "${pages[length][0]}",
   "type": "${pages[length][1]}",
   "link": "pages/${pages[length][0]}.html"
}` 


  if (length < pages.length-1) {
      content+=`,`
  }
              
}
content += "]"

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log('File created successfully:', filePath);
    }
  });
