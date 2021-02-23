import React from "react"
import styled from "styled-components"
import * as variable from "../variables"
import AudioPlayer from "react-h5-audio-player"
import { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const AudioFileStyle = styled.span`
  .rhap_rewind-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      /* content: "15"; */
      color: ${variable.darkGray};
      font-size: 10px;
      position: absolute;
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_forward-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      /* content: "15"; */
      color: black;
      font-size: 10px;
      position: absolute;
      color: ${variable.darkGray};
    }
    svg {
      font-size: 34px;
      color: ${variable.darkGray};
    }
  }
  .rhap_progress-bar-show-download {
    background-color: ${variable.lightGray};
  }
  .rhap_download-progress {
    background-color: ${variable.medGray};
  }
  .rhap_progress-filled {
    background-color: ${variable.red};
  }
  .rhap_progress-indicator {
    background: ${variable.red};
  }
  .rhap_controls-section {
    display: none;
  }
  @media (max-width: ${variable.mobileWidth}) {
    #rhap_current-time {
      display: none;
    }
    .rhap_time {
      display: none;
    }
    .slash {
      display: none;
    }
  }
`

export const AudioFile = ({ content, element }) => {
  const data = useStaticQuery(graphql`
    query aduioquery {
      back: file(relativePath: { eq: "back15.png" }) {
        childImageSharp {
          fixed(width: 28, height: 32) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
      forward: file(relativePath: { eq: "forward15.png" }) {
        childImageSharp {
          fixed(width: 28, height: 32) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const fileUrl = element.data.url
  return (
    <AudioFileStyle>
      <AudioPlayer
        header={content}
        progressJumpSteps={{
          forward: 15000,
          backward: 15000,
        }}
        layout="horizontal"
        customControlsSection={[]}
        customProgressBarSection={[
          "",
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div className="slash">/</div>,
          RHAP_UI.DURATION,
        ]}
        src={fileUrl}
        customIcons={{
          rewind: <Img fixed={data.back.childImageSharp.fixed} />,
          forward: <Img fixed={data.forward.childImageSharp.fixed} />,
        }}
        // other props here
      />
    </AudioFileStyle>
  )
}

export default AudioFile
