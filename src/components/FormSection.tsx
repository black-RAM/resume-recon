import React, { useEffect, useRef, useState, } from "react"
import FormInput from "./FormInput"

interface Data {
  [key: string]: string
}

interface NestedData {
  "fields": string[], 
  "data": {
    [key: string]: Data
  }
}

interface formSectionProps {
  sectionName: string,
  sectionData: Data | NestedData,
  updater: (newData: string, section: string, field: string, id?: string) => void,
}

const FormSection: React.FC<formSectionProps> = (props) => {
  const [inputs, setInputs] = useState<React.JSX.Element[]>([])
  const {sectionName, sectionData, updater} = props

  const inputsFromObject = () => {
    const entries = Object.entries(sectionData as Data)
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
    const section = sectionData as NestedData
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
