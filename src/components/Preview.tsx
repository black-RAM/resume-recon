import React, { useState } from "react"
import A4 from "./A4"
import { DataForm, FormArray, FormField } from "../interfaces/DataForm"
import useViewport from "../hooks/useViewport"
import isFormArray from "../utils/isFormArray"
import hyphenate from "../utils/hyphenate"
import "../styles/Preview.css"
// @ts-ignore
import chevronLeft from "../assets/chevronLeft.svg"
// @ts-ignore
import chevronRight from "../assets/chevronRight.svg"

const Paragraphs: React.FC<{obj: FormField}> = ({obj}) => {
  return Object.entries(obj).map(([key, value], index) => 
    <p key={index} className={hyphenate(key)}>{value}</p>
  )
}

const Content: React.FC<{sketch: FormField | FormArray}> = ({sketch}) => {
  if(isFormArray(sketch)) {
    return Object.entries(sketch["data"]).map(([id, fields], index) => 
      <div className="listed" key={index}>
        <Paragraphs obj={fields} />
      </div>
    )
  } else {
    return <Paragraphs obj={sketch} />
  }
}

const Preview: React.FC<{data: DataForm}> = ({data}) => {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [pageNumber, flipPage] = useState(0)
  const {vw, vh} = useViewport()

  const articles = Object.entries(data).map(([sectionName, sectionData], index) => 
    <article id={hyphenate(sectionName)} className="article" key={index}>
      <h3 className="title">{sectionName}</h3>
      <Content sketch={sectionData} />
    </article>
  )

  const pages = [
    [articles[0], articles[1]],
    [articles[2]]
  ]

  const nextPage = () => flipPage(current => Math.min(current + 1, articles.length))
  const lastPage = () => flipPage(current => Math.max(current - 1, 0))

  return <>
    <div className="flex">
      <button type="button" title="previous page" onClick={lastPage}>
        <img src={chevronLeft} alt="left arrow" />
      </button>
      <A4 maxHeight={100 * vh - 92} maxWidth={45 * vw} overflowAlert={setIsOverflowing}>
        <div id="preview">
          {pages[pageNumber]}
        </div>
      </A4>
      <button type="button" title="next page" onClick={nextPage}>
        <img src={chevronRight} alt="right arrow" />
      </button>
    </div>
  </>
}

export default Preview