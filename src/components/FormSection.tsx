import React, { useEffect, useState, } from "react"
import { FormField, FormArray } from "../interfaces/DataForm"
import FormSectionProps from "../interfaces/FormSectionProps"
import FormInput from "./FormInput"
import isFormArray from "../utils/isFormArray"

const inputsFromFormField = (name: string, data: FormField, listener: CallableFunction, id?: string) => {
  return <div>{
    Object.entries(data).map(([key, value], index) => 
      <FormInput 
        key={index}
        field={key} 
        value={value} 
        updater={(e: React.ChangeEvent<HTMLInputElement>) => {
          listener(e.target.value, name, key, id)
        }} />  
    )
  }</div>
}

const FormSection: React.FC<FormSectionProps> = (props) => {
  const [inputs, setInputs] = useState<React.JSX.Element[]>([])
  const {sectionName, sectionData, updater, creator} = props

  const generateInputs = () => {
    if(isFormArray(sectionData)) {
      const formArrayInputs = Object.entries(sectionData["data"]).map(([id, formField]) => {
        return inputsFromFormField(sectionName, formField, updater, id)
      })
      const addButton = <button type="button" onClick={() => creator(sectionName)}>Add new {sectionName}</button>
      setInputs(others => [...others, ...formArrayInputs, addButton])
    } else {
      const formFieldInputs = inputsFromFormField(sectionName, sectionData, updater)
      setInputs(others => [...others, formFieldInputs])
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
