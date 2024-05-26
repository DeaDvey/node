const feedPath = "/srv/www/htdocs/comics/feed.xml";
const fs = require("fs");
const strips = require("/srv/www/htdocs/comics/strips.js");
console.log(strips);

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
      <description>Random ass comics inspired by XKCD</description>
      <pubDate>${strips[strips.length - 1][1]} +0000</pubDate>
      <lastBuildDate>${strips[strips.length - 1][1]} +0000</lastBuildDate>`;

    // Add items to the feed
    for (let index = strips.length - 1; index >= 0; index--) {
        const currentStrip = strips[index]
        const title = escapeQuotes(currentStrip[0]);
        const content = `<img width='1500' src='/strips/${currentStrip[0]}'/>`;
        const date = escapeQuotes(currentStrip[1]);
        const totalContent = escapeQuotes(content)

        rssFeed += `
      <item>
         <title>${title}</title>
         <link>https://deadvey.com/comics/comic/${index}.html</link>
         <description>${totalContent}</description>
         <pubDate>${date} +0000</pubDate>
      </item>`;
    }

    // Close the RSS feed
    rssFeed += `
   </channel>
</rss>
`;

    return rssFeed;
}

feed = createRSSFeed(strips)

fs.writeFile(feedPath, feed, (err) => {
	if (err) {
		console.error('Error writing to the file:', err);
	} else {
		console.log('Data has been written to the file successfully.');
	}
});


