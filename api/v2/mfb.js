const domino = require('domino');
const fetch = require('node-fetch');
const uri = require('uri-parse');
const pageMetadataParser = require("page-metadata-parser");

module.exports = async (req, res) => {
    if (!req.query.story_fbid) {
        res.json({
            error: "Video ID (story_fbid) not supplied"
        });

    } else if (!req.query.id) {
        res.status(200).json({
            error: "User Id (id) not supplied"
        });
    } else {
        try {
            const url = `https://mobile.facebook.com/story.php?story_fbid=${req.query.story_fbid}&id=${req.query.id}`;
            const resp = await fetch(url);
            const html = await resp.text();
            const doc = domino.createWindow(html).document;
            const v = doc.querySelector("div.cd a");
            const videoUrl = "https://mobile.facebook.com" + v.getAttribute("href");
            const thumbUrl = doc.querySelector("div.cd img").getAttribute("src");
            const metadata = pageMetadataParser.getMetadata(doc, url);
            const title = metadata.title ? metadata.title : "Untitled";
            const description = metadata.description ? metadata.description : "No Description";
            return res.json({
                title: title,
                description: description,
                video, videoUrl,
                thumbnail: thumbUrl
            });
        }
        catch (ex) {
            res.json({
                "error": "Error while fetching video!" + ex,
            });
        }

    }
}