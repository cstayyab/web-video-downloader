const videoUrlLink = require("../../video-url-link")
var pageMetadataParser = require("page-metadata-parser")
var fetch = require('node-fetch');
var domino = require('domino');


module.exports = async (req, res) => {
    if (!req.query.postId) {
        res.json({
            error: "Intagram Post Id not supplied"
        });

    } else {
        const igURL = `https://www.instagram.com/p/${req.query.postId}`;
        videoUrlLink.instagram.getInfo(igURL, async (error, info) => {
            if (error) {
                if (error === {}) {
                    res.json({ error: "Invalid Post ID" });
                } else {
                    res.json({ error: error });
                }
            } else {
                const resp = await fetch(igURL);
                const html = await resp.text();
                const doc = domino.createWindow(html).document;
                const metadata = pageMetadataParser.getMetadata(doc, igURL);
                const title = metadata.title ? metadata.title : "Untitled";
                const description = metadata.description ? metadata.description : "No Description";
                res.json({title: title, description: description, media: info.list});
            }
        });
    }
};
