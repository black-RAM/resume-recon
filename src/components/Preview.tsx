import React from "react"
import { DataForm, FormField } from "../interfaces/DataForm"
import isFormArray from "../utils/isFormArray"
import hyphenate from "../utils/hyphenate"

const Preview: React.FC<{data: DataForm}> = ({data}) => {
  const createParagraphs = (obj: FormField) => {
    return Object.entries(obj).map(([key, value], index) => 
      <p className={hyphenate(key)} key={index}>{value}</p>
    )
  }

  return (
    <>{
      Object.entries(data).map(([sectionName, sectionData], index) => {
        return <article className={hyphenate(sectionName)} key={index}>
          <h2 className="title">{sectionName}</h2>
          {isFormArray(sectionData) ? 
            Object.entries(sectionData["data"]).map(([_, fields], index) => {
              return <div key={index}>{createParagraphs(fields)}</div>
            }) :
            createParagraphs(sectionData)}
        </article>
      })
    }</>
  )
}

export default Preview