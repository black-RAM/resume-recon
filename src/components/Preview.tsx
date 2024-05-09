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
    <div className="bg-white w-1/2 h-full">{
      Object.entries(data).map(([sectionName, sectionData], index) => {
        return <article className={hyphenate(sectionName)} key={index}>
          <h3 className="title">{sectionName}</h3>
          {isFormArray(sectionData) ? 
            Object.entries(sectionData["data"]).map(([_, fields], index) => {
              return <div key={index}>{createParagraphs(fields)}</div>
            }) :
            createParagraphs(sectionData)}
        </article>
      })
    }</div>
  )
}

export default Preview