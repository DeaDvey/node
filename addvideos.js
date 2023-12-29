const fs = require('fs/promises');

async function readFilesAndPopulateVideos(path) {
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

// Call the function with await
(async () => {
    try {
        const videos = await readFilesAndPopulateVideos('/srv/www/htdocs/video/videos');

        const videosJSFileContent = `let videos = ${JSON.stringify(videos)}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = videos;
}`;

        await fs.writeFile("/srv/www/htdocs/video/videos.js", videosJSFileContent);
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('Error:', err);
    }
})();
