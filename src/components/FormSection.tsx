import React, { useEffect, useState, } from "react"
import { FormField, FormArray } from "../interfaces/DataForm"
import FormSectionProps from "../interfaces/FormSectionProps"
import FormInput from "./FormInput"

const FormSection: React.FC<FormSectionProps> = (props) => {
  const [inputs, setInputs] = useState<React.JSX.Element[]>([])
  const {sectionName, sectionData, updater} = props

  const inputsFromObject = () => {
    const entries = Object.entries(sectionData as FormField)
    const objInputs = entries.map(([key, value], index) => {
      return (
        <FormInput 
          key={index}
          field={key} 
          value={value} 
          updater={(e: React.ChangeEvent<HTMLInputElement>) => {
            updater(e.target.value, sectionName, key)
          }} />
      )
    })

    setInputs(others => [...others, <div>{objInputs}</div>]) 
  }

  const inputsFromArray = () => {
    const id = crypto.randomUUID()
    const section = sectionData as FormArray
    const dataObject = section["data"][id] || {}
    const dataFields = section["fields"]
    
    const arrInputs = dataFields.map((field, index) => {
      return (
        <FormInput 
          key={index}
          field={field}
          value={dataObject[field]}
          updater={(e: React.ChangeEvent<HTMLInputElement>) => {
            updater(e.target.value, sectionName, field, id)
          }} 
          />
      )
    })

    setInputs(others => [...others, <div>{arrInputs}</div>])
  }

  const generateInputs = () => {
    if(Array.isArray(sectionData["fields"])) {
      const addButton = <button type="button" onClick={inputsFromArray}>Add new {sectionName.split(" ")[0]}</button>
      setInputs(others => [...others, addButton])
    } else {
      inputsFromObject()
    }

    return () => {
      setInputs(() => [])
    }
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
