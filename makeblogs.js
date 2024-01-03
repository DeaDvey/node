const blogs = require("/srv/www/htdocs/blog/blogs.js");
const filePath = "/srv/www/htdocs/blog/blogs/";
const fs = require("fs");
const { pageTop, pageBottom } = require("/srv/www/htdocs/html.js")

console.log(blogs);
 ////////////////////////////////
// Make each individual blog page
/////////////////////////////////
for (let length = 0; length < blogs.length; length++) {
  console.log(length)
  const blogFilePath = filePath + length + ".html";
  let content = `${pageTop}
                <h3 class="blog-date">${blogs[length][2]}</h3>
                <h1 class="blog-title">${blogs[length][0]}</h1>
                <p class="blog-content">${blogs[length][1]}</p>
                ${blogs[length][3] ? 
                  `<div class="blog-images">
                    ${blogs[length][3].map(image => `<img class="blog-image" height="200" src="/images/${image}" alt="${image}" />`).join('')}
                  </div>` 
                  : ''}<br/>
                <sub><i><small>${blogs[length][4]}</small></i></sub>` 
  if (length > 0) { // Generate link to previous blog
      content+=`<p class="previous"><a href="${length-1}.html"><-- Previous</a></p>`
  }
  if (length != blogs.length - 1) { // Generate link to next blog
      content+=`<p class="next"><a href="${length+1}.html">Next --></a></p>`
  }
                
  content += `
                <div id="links">
                </div><script src="/template.js"></script>${pageBottom}` 


  fs.writeFile(blogFilePath, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log('File created successfully:', blogFilePath);
    }
  });

///////////////////////
// Make latest blog
//////////////////////
latestBlogPath = filePath + "latest.html"
console.log(latestBlogPath)
lastitem = blogs.length - 1
let latestcontent = `${pageTop}
               <h3 class="blog-date">${blogs[lastitem][2]}</h3>
               <h1 class="blog-title">${blogs[lastitem][0]}</h1>
                <p class="blog-content">${blogs[lastitem][1]}</p>
                ${blogs[lastitem][3] ?
                  `<div class="blog-images">
                    ${blogs[lastitem][3].map(image => `<img class="blog-image" height="200" src="/images/${image}" alt="${image}" />`).join('')}
                  </div>`
                  : ''}<br/>
                <sub><i><small>${blogs[lastitem][4]}</small></i></sub>
                <p class="previous"><a href="${lastitem-1}.html"><-- Previous</a></p>
                <div id="links">
                </div><script src="/template.js"></script>${pageBottom}`

fs.writeFile(latestBlogPath, latestcontent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log('File created successfully:', latestBlogPath);
    }
  });



///////////////////////
// Make entire blog
//////////////////////
function entireBlogPost() {
	let htmlPage = pageTop;

  // Add each blog post to the HTML page
  for (let length = blogs.length - 1; length >= 0; length--) {
    const title = blogs[length][0];
    const content = blogs[length][1];
    const date = blogs[length][2];

    htmlPage += `
            <h3 class="blog-date">${date}</h3>
            <h1 class="blog-title">${title}</h1>
            <p class="blog-content">${content}</p>
            ${blogs[length][3] ? 
                  `<div class="blog-images">
                    ${blogs[length][3].map(image => `<img class="blog-image" height="200" src="/images/${image}" alt="${image}" />`).join('')}
                  </div>` 
                  : ''}

            <div id="links"></div><hr/><script src="/template.js"></script>`;
  }

  //Remove the last <hr/>
  htmlPage = htmlPage.slice(0, -5)
  // Close the HTML page
  htmlPage += pageBottom;

  return htmlPage;
}

entireBlog = entireBlogPost()
entireFeedPath = filePath + "all.html"

fs.writeFile(entireFeedPath, entireBlog, (err) => {
	if (err) {
		console.error('Error writing to the file:', err);
	} else {
	console.log('Data has been written to the file successfully.');
        }
});

}
