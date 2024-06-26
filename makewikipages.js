const pages = require("/srv/www/htdocs/theunderland/wiki/pages.js");
const filePath = "/srv/www/htdocs/theunderland/wiki/pages/";
const fs = require("fs");
const { pageTop, pageBottom } = require("/srv/www/htdocs/html.js")

console.log(pages);
 ////////////////////////////////
// Make each individual blog page
/////////////////////////////////
for (let length = 0; length < pages.length; length++) {
  console.log(length)
  const pageFilePath = filePath + pages[length][0] + ".html";

    // Makes anything surrounded by && into a link to that page
    let wikiText = pages[length][2];
    wikiText = wikiText.replace(/&&([^&]+)&&/g, '<a href="$1.html">$1</a>');



  let content = `<h1>${pages[length][0]}</h1><br/>
<p>${wikiText}</p><br/><hr/>
<h2>Links</h2>
<a href="/theunderland/wiki">Search Page</a><br/>
<a href="https://brace.dev/tuc-timeline">TUC Timeline (External)</a><br/>
<a href="https://discord.gg/UP2MtTqSED">TUC Discord (External)</a><br/>
<a href="https://www.youtube.com/watch?v=EbyWMRyBrkY">The Underland Project (External)</a><br/>
<h2>Thanks to:</h2>
<a href="https://underlandchronicles.fandom.com/wiki/The_Underland_Cyclopedia">The Underland Chronicles Fandom<a/> For a good resource while researching, licensed under CC-BY-SA<br/>
<a href="https://en.wikipedia.org/wiki/List_of_The_Underland_Chronicles_characters">Wikipedia</a> For a good resource while researching, licensed under Creative Commons Attribution-ShareAlike License 4.0<br/>
` 

                


  fs.writeFile(pageFilePath, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log('File created successfully:', pageFilePath);
    }
  });
}
