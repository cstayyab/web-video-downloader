const videoUrlLink = require("video-url-link")

module.exports = async (req, res) => {
    if (!req.query.postId) {
        res.json({
            error: "Intagram Post Id not supplied"
        });

    } else {
        videoUrlLink.instagram.getInfo(`https://www.instagram.com/p/${req.query.postId}`, (error, info) => {
            if (error) {
                if (error === {}) {
                    res.json({error: "Invalid Post ID"});
                } else {
                    res.json({error: error});
                }
            } else {
                res.json(info.list);
            }
        });
    }
};
