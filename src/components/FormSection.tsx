import React from "react"

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

interface FormInputs {
  [key: string]: string
}

type formSectionProps = {
  sectionName: string,
  fields: FormInputs | FormInputs[],
  updater: (newData: string, section: string, field: string) => void
}

const FormSection: React.FC<formSectionProps> = ({sectionName, fields, updater}) => {
  let inputs: React.JSX.Element | React.JSX.Element[]

  if(Array.isArray(fields)) {
    inputs = <button type="button">Add new {sectionName}</button>
  } else {
    inputs = Object.entries(fields).map(([field, value], index) => {
      return <FormInput 
        key={index}
        field={field} 
        value={value} 
        updater={(e: React.ChangeEvent<HTMLInputElement>) => {
          updater(e.target.value, sectionName, field)
        }} />
    })
  }

  return (
    <div>
      <h2>{sectionName}</h2>
      {inputs}
    </div>
  )
}

export default FormSection
