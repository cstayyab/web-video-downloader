//import getInfo from "fb-video-downloader";

export default async (req, res) => {
  if(!req.body.videoId) {
    res.status(200).json({
      error: "Video ID not supplied"
    });
    return;
  }
  if(!req.body.user) {
    res.status(200).json({
      error: "Username not supplied"
    });
    return;
  }
  const v = {success: true }//await getInfo(`https://www.facebook.com/${req.body.user}/videos/${req.body.videoId}/`);
  res.status(200).json(v);
};
