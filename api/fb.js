import getInfo from "fb-video-downloader";

export default async (req, res) => {
  if(!req.body.videoId) {
    res.json({
      error: "Video ID not supplied"
    });
    return;
  }
  if(!req.body.user) {
    res.json({
      error: "Username not supplied"
    });
    return;
  }
  const v = await getInfo(`https://www.facebook.com/${req.body.user}/videos/${req.body.videoId}/`);
  res.json(v);
};
