const fs = require('fs');

const filePath = '/srv/www/htdocs/blog/index.html';
const blogs = require("/srv/www/htdocs/blog/blogs.js")

function escapeQuotes(value) {
    return value.replace(/["'&<>]/g, function (char) {
        switch (char) {
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            default:
                return char;
        }
    });
}
console.log(blogs)

let linksText = "<a href='blogs/all.html'>ALL POSTS</a>"

let dateObject
let month
let year

let oldMonth = "blibidy blob"
let oldYear = "bloopy aw"

for (let page = blogs.length - 1; page >= 0; page--) {
    dateObject = new Date(blogs[page][2])
    month = dateObject.toLocaleString('en-US', {month: 'long'});
    year = dateObject.getFullYear()
    const dayOfWeek = dateObject.toLocaleString('en-US', { weekday: 'long' }); // 'long' returns the full day name
    const dayOfMonth = dateObject.getDate();
    console.log(month, year, dayOfMonth, dayOfWeek)



    if (month != oldMonth) {
       linksText += (`<h4>${month} ${year}</h4>`)
    }

    linksText += (`<li class="indent">• <a href='blogs/${page}.html'>${escapeQuotes(blogs[page][0])}</a> -- ${dayOfWeek} ${dayOfMonth}</li>`)

    oldYear = year
    oldMonth = month
}

// Step 2: Read the HTML file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Step 3: Identify the target div
    const targetDivId = 'links';

    // Step 4: Create the new content (e.g., a paragraph element)
    const newContent = linksText

    // Step 5: Replace the existing content in the target div
    const regex = new RegExp(`<div id="${targetDivId}">([\\s\\S]*?)<\/div>`);
    const updatedData = data.replace(regex, `<div id="${targetDivId}">${newContent}</div>`);

    // Step 6: Save the updated content back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Content replaced successfully in ', filePath);
    });
});
