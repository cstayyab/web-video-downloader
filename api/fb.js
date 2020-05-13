import getInfo from "fb-video-downloader";

module.exports =  async (req, res) => {
  if(!req.query.videoId) {
    res.json({
      error: "Video ID not supplied"
    });

  } else {
    res.json({online: true, videoId: req.query.videoId});
  }
  // if(!req.body.user) {
  //   res.status(200).json({
  //     error: "Username not supplied"
  //   });
  //   return 200;
  // }
  // const v = {success: true }//await getInfo(`https://www.facebook.com/${req.body.user}/videos/${req.body.videoId}/`);
  // res.status(200).json(v);
  // return 200;
};
