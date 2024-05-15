import React, { useEffect, useState, } from "react"
import FormGroup from "./FormGroup.tsx"
import FormSectionProps from "../interfaces/FormSectionProps.ts"
import uuid from "../interfaces/uuid.ts"
import isFormArray from "../utils/isFormArray.ts"
// @ts-ignore
import libraryAddIcon from "../assets/libraryAddIcon.svg"
// @ts-ignore
import deleteIcon from "../assets/deleteIcon.svg"

const FormSection: React.FC<FormSectionProps> = (props) => {
  const [inputs, setInputs] = useState<React.JSX.Element[]>([])
  const {sectionName, sectionData, dispatcher} = props

  const generateInputs = () => {
    const newInputs: React.JSX.Element[] = []

    if(isFormArray(sectionData)) {
      const groups = Object.entries(sectionData["data"]).map(([id, attribute], index) => 
        <div className="p-4 my-4 shadow">
          <div className="flex justify-between">
            <h4 className="text-lg font-bold">{Object.entries(attribute)[0][1]}</h4>
            <button type="button" onClick={() => dispatcher({type: "DELETE", section: sectionName, id: id as uuid})}>
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
          <FormGroup section={sectionName} fields={attribute} id={id as uuid} dispatcher={dispatcher} key={index}  />
        </div>
      )
      
      const addButton = (
        <button 
          type="button" 
          onClick={() => dispatcher({type: "CREATE", section: sectionName})}
          className="flex gap-1 bg-hunt-yellow bg-opacity-75 hover:bg-opacity-100 px-4 py-1 my-4">
            <img src={libraryAddIcon} alt="library add icon" />
            <p>Add new {sectionName}</p>
        </button>
      )

      newInputs.push(...groups, addButton)
    } else {
      newInputs.push(<FormGroup section={sectionName} fields={sectionData} dispatcher={dispatcher}/>)
    }

    setInputs(others => [...others, ...newInputs])

    return () => setInputs(() => [])
  }

  useEffect(generateInputs, [props])

  return (
    <div>
      <h2 className="text-xl capitalize bg-hunt-blue text-hunt-grey p-2">{sectionName}</h2>
      {inputs}
    </div>
  )
}

export default FormSection
