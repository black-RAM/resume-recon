import React, { useEffect, useState } from "react"
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
import { useImmer } from "use-immer"

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
  const [pages, setPages] = useImmer([data])
  const [pageNumber, flipPage] = useState(0)
  const {vw, vh} = useViewport()

  const updatePage = () => setPages([data])
  useEffect(updatePage, [data])
  
  const clearOverflow = () => {
    if(isOverflowing) {
      setPages(pages => {
        const page = pages[pageNumber]
        const last = Object.entries(page).pop()
        if(last) {
          const [name, data] = last
          delete page[name]
          const newPage: DataForm = {}
          newPage[name] = data
          pages.push(newPage)
        }
      })
    }
  }

  useEffect(clearOverflow, [data, isOverflowing])
  console.log(isOverflowing)

  const articles = Object.entries(pages[pageNumber]).map(([sectionName, sectionData], index) => 
    <article id={hyphenate(sectionName)} className="article" key={index}>
      <h3 className="title">{sectionName}</h3>
      <Content sketch={sectionData} />
    </article>
  )

  const nextPage = () => flipPage(current => Math.min(current + 1, pages.length - 1))
  const lastPage = () => flipPage(current => Math.max(current - 1, 0))

  return <>
    <div className="flex">
      <button type="button" title="previous page" onClick={lastPage}>
        <img src={chevronLeft} alt="left arrow" />
      </button>
      <A4 maxHeight={100 * vh - 92} maxWidth={45 * vw} overflowAlert={setIsOverflowing}>
        <div id="preview">
          {articles}
        </div>
      </A4>
      <button type="button" title="next page" onClick={nextPage}>
        <img src={chevronRight} alt="right arrow" />
      </button>
    </div>
  </>
}

export default Preview