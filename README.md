# Web Video Downloader

## Usage

### Facebook Video Download (`https://web-video-downloader.now.sh/api/fb?videoId=<Facebook-Video-ID>`)

*In Progress*

### Intagram Post Download (`https://web-video-downloader.now.sh/api/ig?postId=<Instagram Post Id>`)

**Sample URL:** https://www.instagram.com/p/B_8Pt4LAxzg/
**postID:** B_8Pt4LAxzg
**Sample Request:** https://web-video-downloader.now.sh/api/ig?postId=B_8Pt4LAxzg
**Sample Response:**
```
[
  {
    "image": "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/96845689_1352134798309155_8685046802554592310_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=J2FyRImn74EAX-Xf5Ne&oh=f1b4eb218a6e50581d253916dc880a1b&oe=5EBECAEA",
    "video": "https://scontent-sjc3-1.cdninstagram.com/v/t50.2886-16/96405872_123440705999741_6166829985397212170_n.mp4?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=TmEpOjGtzzQAX-xmviQ&oe=5EBEADE6&oh=08aa5334656606d064ae3bc235c2c5e7"
  }
]
```
**Response Explanation:** Here each item in array represent one page of post. If Page contains video then "`image`" key will contain thumbnail of that video and "`video`" key will contain direct link to the video. Similarly, if the page of the Post contains and image then only "`image`" key will be there in that element of the array which will provide direct link of that image.

**Error:** If there is an error the "`error`" key will be returned instead of `Array`


## License

MIT
