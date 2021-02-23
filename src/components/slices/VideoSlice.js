import React from "react"
import ResponsiveEmbed from "react-responsive-embed"
import Container from "../container"

export const VideoSlice = ({ slice }) => {
  var video_id = slice.primary.video_embed.embed_url.split("v=")[1]
  var ampersandPosition = video_id.indexOf("&")
  if (ampersandPosition !== -1) {
    video_id = video_id.substring(0, ampersandPosition)
  }
  return (
    <Container className="video-slice">
      <ResponsiveEmbed
        src={
          "https://www.youtube.com/embed/" + slice.primary.video_embed.embed_url
        }
      />
    </Container>
  )
}

export default VideoSlice
