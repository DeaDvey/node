const projects = require("/srv/www/htdocs/project/projects.js");
const filePath = "/srv/www/htdocs/project/projects/";
const fs = require("fs");
const { pageTop, pageBottom } = require("/srv/www/htdocs/html.js")

let content = `${pageTop}
<body>
<table class="projects-table">
<tr>
<td>Name:</td>
<td>Description:</td>
<td>Language(s):</td>
<td>Dependencies:</td>
<td>Date of Development:</td>
<td>.zip:&nbsp;&nbsp;&nbsp;&nbsp;</td>
<td>.tar.gz:</td>
<tr>`

console.log(projects);
 ////////////////////////////////
// Make each individual blog page
/////////////////////////////////
for (let length = 0; length < projects.length; length++) {
  console.log(length)
    
  content += `
<tr>
<td>${projects[length][0]}</td>
<td>${projects[length][1]}</td>
<td>${projects[length][2]}</td>
<td>${projects[length][3]}</td>
<td>${projects[length][4]}</td>
<td><a href="projects/${projects[length][5]}" download=""><img src="/images/download.png"></a></td>
<td><a href="projects/${projects[length][6]}" download=""><img src="/images/download.png"></a></td>` 

}

content += `</table></body>${pageBottom}`

fs.writeFile("/srv/www/htdocs/project/index.html", content, (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File edited successfully: /srv/www/htdocs/project/index.html', );
  }
});
