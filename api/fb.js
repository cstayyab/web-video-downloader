import  fbvid from 'fbvideos';

module.exports =  async (req, res) => {
  if(!req.query.videoId) {
    res.json({
      error: "Video ID not supplied"
    });

  } else if(!req.query.user) {
    res.status(200).json({
      error: "Username not supplied"
    });
  }else {
    //res.json({online: true, videoId: req.query.videoId, user: req.query.user});
    const video = `https://www.facebook.com/${req.query.user}/videos/${req.query.videoId}/`;
    const low = await fbvid.low(video);
    const high = await fbvid.high(video);
    res.json({
      low: low,
      high: high
    });
  }
  
  // const v = {success: true }//await getInfo(`https://www.facebook.com/${req.body.user}/videos/${req.body.videoId}/`);
  // res.status(200).json(v);
  // return 200;
};
