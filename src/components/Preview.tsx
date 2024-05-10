import React from "react"
import { DataForm, FormField } from "../interfaces/DataForm"
import isFormArray from "../utils/isFormArray"
import hyphenate from "../utils/hyphenate"
import useViewport from "../hooks/useViewport"

const Paragraphs: React.FC<{obj: FormField}> = ({obj}) => {
  return Object.entries(obj).map(([key, value], index) => 
    <p className={hyphenate(key)} key={index}>{value}</p>
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
    <div className="bg-white" style={{width: width, height: height}}>{
      Object.entries(data).map(([sectionName, sectionData], index) => {
        return <article className={hyphenate(sectionName)} key={index}>
          <h3 className="title">{sectionName}</h3>
          {isFormArray(sectionData) ? 
            Object.entries(sectionData["data"]).map(([_, fields], index) => {
              return <div key={index}>
                <Paragraphs obj={fields} />
              </div>
            }) :
            <Paragraphs obj={sectionData} />}
        </article>
      })
    }</div>
  )
}

export default Preview