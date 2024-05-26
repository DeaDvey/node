const fs = require('fs/promises');
const stripsPath = "/srv/www/htdocs/strips/"
const sandboxedStripsPath = "/strips/"
const { pageTop, pageBottom } = require("/srv/www/htdocs/html.js")

async function readFilesAndPopulateStrips(path) {
    try {
        const files = await fs.readdir(path);

        // Use Promise.all to wait for all fs.stat operations to complete
        const statsPromises = files.map(async (file) => {
            const filePath = `${path}/${file}`;
            const stats = await fs.stat(filePath);
            return [file, stats.mtime];
        });

        const videos = await Promise.all(statsPromises);

        // Sort the videos array by modification time (most recent first)
        videos.sort((a, b) => b[1] - a[1]);

        console.log('Videos:', videos);
        return videos;
    } catch (err) {
        console.error('Error reading directory:', err);
        throw err;
    }
}

// Call the function with aConvert file date to individual dates in jswait

(async () => {
    try {
        const strips = await readFilesAndPopulateStrips(stripsPath);

	for (let currentStrip = 0; currentStrip < strips.length; currentStrip++) {
	    let comicPagesFilePath = "/srv/www/htdocs/comics/comic/" + currentStrip + ".html"
	    console.log(currentStrip, " = ",strips.reverse()[currentStrip][0])
	    let content = `${pageTop}
<img src="${sandboxedStripsPath}${strips.reverse()[currentStrip][0]}"/>`

	    if (currentStrip > 0) {
		content+=`<a href="${currentStrip-1}.html">Next --></a>`
	    }
	    if (currentStrip != strips.length-1) {
		content+=`<a href="${currentStrip+1}.html"><-- Previous</a>`
	    }
	    content+=`${pageBottom}`
	    
	    
	    console.log(currentStrip)
	    await fs.writeFile(comicPagesFilePath, content);
	    console.log("Done");
	}
	const jsonStrips = JSON.stringify(await readFilesAndPopulateStrips(stripsPath))

        const videosJSFileContent = `let strips = ${jsonStrips}
strips = strips.reverse()
if (typeof module !== 'undefined' && module.exports) {
       module.exports = strips;
}`;

        await fs.writeFile("/srv/www/htdocs/comics/strips.js", videosJSFileContent);
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
})();
