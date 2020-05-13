import  fbvid from 'fbvideos';
import validURL from 'valid-url';

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
    var response = {}
    if(validURL.isUri(low)) {
      response.low = low;
    } else {
      response.lowError = low;
    }
    if(validURL.isUri(high)) {
      response.high = high;
    } else {
      response.highError = high;
    }
    res.json(response);
  }
  
  // const v = {success: true }//await getInfo(`https://www.facebook.com/${req.body.user}/videos/${req.body.videoId}/`);
  // res.status(200).json(v);
  // return 200;
};
