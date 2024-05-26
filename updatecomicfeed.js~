const feedPath = "/srv/www/htdocs/blog/feed.xml";
const fs = require("fs");
const blogs = require("/srv/www/htdocs/blog/blogs.js");
console.log(blogs);

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


// Function to create RSS feed as a string
function createRSSFeed(blogs) {
    let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
   <channel>
      <title>DeaDvey</title>
      <link>https://deadvey.com</link>
      <description>Just talking about life and stuff I guess</description>
      <pubDate>${blogs[blogs.length - 1][2]} +0000</pubDate>
      <lastBuildDate>${blogs[blogs.length - 1][2]} +0000</lastBuildDate>`;

    // Add items to the feed
    for (let index = blogs.length - 1; index >= 0; index--) {
        const blog = blogs[index]
        const title = escapeQuotes(blog[0]);
        const content = escapeQuotes(blog[1]);
        const date = escapeQuotes(blog[2]);
        const imagesHtml = blogs[index][3] ? `${blogs[index][3].map(image => `<img src="/images/${image}" alt="Blog Image" />`).join('')}` : '';
        const totalContent = content + escapeQuotes(imagesHtml)
        const category = blog[4] ? blog[4].map(category => `<category>${escapeQuotes(category)}</category>`).join('') : '';

        rssFeed += `
      <item>
         <title>${title}</title>
         <link>https://deadvey.com/blog/blogs/${index}.html</link>
         <description>${totalContent}</description>
         <pubDate>${date} +0000</pubDate>
         ${category}
      </item>`;
    }

    // Close the RSS feed
    rssFeed += `
   </channel>
</rss>
`;

    return rssFeed;
}

feed = createRSSFeed(blogs)

fs.writeFile(feedPath, feed, (err) => {
	if (err) {
		console.error('Error writing to the file:', err);
	} else {
		console.log('Data has been written to the file successfully.');
	}
});


