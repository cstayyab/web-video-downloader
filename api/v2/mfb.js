const domino = require('domino');
const fetch = require('node-fetch');
const URI = require('uri-parse');
const urlDecode = require('urldecode')
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
            var v = doc.querySelector("div.cd a");
            var t = doc.querySelector("div.cd img")
            if(v == undefined) {
                v = doc.querySelector("div.cn a");
                t = doc.querySelector("div.cn img")
            }
            var videoUrl = "";
            try {
                videoUrl = "https://mobile.facebook.com" + v.getAttribute("href");
                const uri = new URI(videoUrl);
                videoUrl = urlDecode(uri.query.src);
            } catch (ex) {
                videoUrl = "";
            }
            var thumbUrl = "";
            try {
                thumbUrl = t.getAttribute("src");
            } catch (ex) {
                thumbUrl = "";
            }
            const metadata = pageMetadataParser.getMetadata(doc, url);
            if (metadata.type !== "video") {
                return res.json({
                    "error": "This Facebook Post does not contain a video"
                });
            }
            const title = metadata.title ? metadata.title : "Untitled";
            const description = metadata.description ? metadata.description : "No Description";
            return res.json({
                title: title,
                description: description,
                video: videoUrl,
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