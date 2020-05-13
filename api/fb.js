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
    const video = `https://www.facebook.com/${req.query.user}/videos/${req.query.videoId}/`;
    const low = await fbvid.low(video);
    const high = await fbvid.high(video);
    var response = {}
    if((typeof low) === "object") {
      response.low = low;
    } else {
      response.low = {error: low};
    }
    if((typeof high) === "object") {
      response.high = high;
    } else {
      response.high = {error: high};
    }
    res.json(response);
  }
};
