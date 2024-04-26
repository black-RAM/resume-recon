import React, { useEffect, useState } from "react"

type formInputProps = {
  field: string, 
  value: string, 
  updater: React.ChangeEventHandler<HTMLInputElement>
}

const FormInput: React.FC<formInputProps> = ({field, value, updater}) => {
  return (
    <div>
      <label>
        {field}: <input type="text" value={value} onChange={updater} />
      </label>
    </div>
  )
}

type formSectionProps = {
  sectionName: string,
  sectionData: {[key: string]: string | ({[key: string]: string} | string)[]},
  updater: (newData: string, section: string, field: string) => void
}

const FormSection: React.FC<formSectionProps> = ({sectionName, sectionData, updater}) => {
  let [inputs, setInputs] = useState<React.JSX.Element[]>([])

  const inputsFromObject = (obj: object) => {
    const objInputs = Object.entries(obj).map(([key, value], index) => 
      <FormInput 
        key={index}
        field={key} 
        value={value as string} 
        updater={(e: React.ChangeEvent<HTMLInputElement>) => {
          updater(e.target.value, sectionName, key)
        }} />
    )

    setInputs(others => [...others, <div>{objInputs}</div>]) 
  }

  const inputsFromArray = (arr: any[]) => {
    const arrInputs = arr.map((field, index) => 
      <FormInput 
        key={index} 
        field={field} 
        value="" 
        updater={() => {}} 
        />)

    setInputs(others => [...others, <div>{arrInputs}</div>])
  }

  const generateInputs = () => {
    const fieldsArray = sectionData["fields"] 

    if(Array.isArray(fieldsArray)) {
      const creator = () => inputsFromArray(fieldsArray)
      const addButton = <button type="button" onClick={creator}>Add new {sectionName}</button>
      setInputs(others => [...others, addButton])
    } else {
      inputsFromObject(sectionData)
    }

    return () => {
      setInputs(_ => [])
    }
  }

  useEffect(generateInputs, [sectionName, sectionData, updater])

  return (
    <div>
      <h2>{sectionName}</h2>
      {inputs}
    </div>
  )
}

export default FormSection
