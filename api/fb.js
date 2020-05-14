var fbvid = require('fbvideos');
var pageMetadataParser = require("page-metadata-parser")
var fetch = require('node-fetch');
var domino = require('domino');

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
    const res = await fetch(url);
    const html = await res.text();
    const doc = domino.createWindow(html).document;
    const metadata = pageMetadataParser.getMetadata(doc, url);
    const title  = metadata.title ? metadata.title : "Untitled";
    const description = metadata.description ? metadata.description : "No Description";
    const thumbnail = metadata.image;
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
    if(!(response.low.error && response.high.error)) {
      response.title = title;
      res.description = description;
      res.thumbnail = thumbnail;
    }
    res.json(response);
  }
};
