import React from "react"
import styled from "styled-components"
import { Link, RichText, Date } from "prismic-reactjs"
import * as variable from "../variables"
import AudioPlayer from "react-h5-audio-player"
import { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons"
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"
const AudioFileStyle = styled.div`
  .rhap_rewind-button {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "15";
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
      content: "15";
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
`

export const AudioFile = ({ content, element }) => {
  console.log(content)
  console.log(element)
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
        customControlsSection={[RHAP_UI.VOLUME_CONTROLS]}
        customProgressBarSection={[
          ,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div>/</div>,
          RHAP_UI.DURATION,
        ]}
        src={fileUrl}
        onPlay={e => console.log("onPlay")}
        customIcons={{
          rewind: <FontAwesomeIcon icon={faUndoAlt} />,
          forward: <FontAwesomeIcon icon={faRedoAlt} />,
        }}
        // other props here
      />
    </AudioFileStyle>
  )
}

export default AudioFile
