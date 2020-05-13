const videoUrlLink = require("video-url-link")

module.exports = async (req, res) => {
    if (!req.query.videoId) {
        res.json({
            error: "Intagram Video Id not supplied"
        });

    } else {
        videoUrlLink.instagram.getInfo(`https://www.instagram.com/p/${req.query.videoId}`, (error, info) => {
            if (error) {
                res.json({error: error})
            } else {
                res.json(info.list);
            }
        });
    }
};
