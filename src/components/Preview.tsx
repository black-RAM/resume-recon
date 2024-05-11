import React from "react"
import { DataForm, FormField } from "../interfaces/DataForm"
import isFormArray from "../utils/isFormArray"
import hyphenate from "../utils/hyphenate"
import useViewport from "../hooks/useViewport"
import "../styles/Preview.css"

const Content: React.FC<{obj: FormField}> = ({obj}) => {
  return Object.entries(obj).map(([key, value], index) => 
    <p key={index} className={hyphenate(key)}>{value}</p>
  )
}

const Preview: React.FC<{data: DataForm}> = ({data}) => {
  // for a A4 paper aspect ratio
  const {vw, vh} = useViewport()
  const maxWidth = 45 * vw
  const maxHeight = 100 * vh - 92
  const portrait = maxWidth * Math.sqrt(2)
  const landscape = maxHeight / Math.sqrt(2)
  const width = Math.min(landscape, maxWidth)
  const height = Math.min(portrait, maxHeight)

  return (
    <div id="preview" style={{width: width, height: height, fontSize: height / 30}}>{
      Object.entries(data).map(([sectionName, sectionData], index) => {
        return <article id={hyphenate(sectionName)} className="article" key={index}>
          <h3 className="title">{sectionName}</h3>
          {isFormArray(sectionData) ? 
            Object.entries(sectionData["data"]).map(([_, fields], index) => {
              return <div key={index} className="listed">
                <Content obj={fields} />
              </div>
            }) :
            <Content obj={sectionData} />}
        </article>
      })
    }</div>
  )
}

export default Preview