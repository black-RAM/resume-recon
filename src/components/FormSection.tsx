import React, { useEffect, useState, } from "react"
import FormSectionProps from "../interfaces/FormSectionProps"
import isFormArray from "../utils/isFormArray"
import uuid from "../interfaces/uuid"
import FormGroup from "./FormGroup"

const FormSection: React.FC<FormSectionProps> = (props) => {
  const [inputs, setInputs] = useState<React.JSX.Element[]>([])
  const {sectionName, sectionData, dispatcher} = props

  const generateInputs = () => {
    const newInputs: React.JSX.Element[] = []

    if(isFormArray(sectionData)) {
      newInputs.push(
        ...Object.entries(sectionData["data"]).map(([id, attribute], index) => 
          <FormGroup section={sectionName} fields={attribute} id={id as uuid} dispatcher={dispatcher} key={index}  />
        ), 
        <button type="button" onClick={() => dispatcher({type: "CREATE", section: sectionName})}>
          Add new {sectionName}
        </button>
      )
    } else {
      newInputs.push(<FormGroup section={sectionName} fields={sectionData} dispatcher={dispatcher}/>)
    }

    setInputs(others => [...others, ...newInputs])

    return () => setInputs(() => [])
  }

  useEffect(generateInputs, [props])

  return (
    <div>
      <h2>{sectionName}</h2>
      {inputs}
    </div>
  )
}

export default FormSection
