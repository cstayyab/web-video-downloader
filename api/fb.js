import getInfo from "fb-video-downloader";

export default async (req, res) => {
  if(!req.body.videoId) {
    res.json({
      error: "Video ID not supplied"
    });
    return;
  }
  const v = await getInfo(`https://www.facebook.com/welaxvideo/videos/${req.body.videoId}/`);
  res.json(v);
};
