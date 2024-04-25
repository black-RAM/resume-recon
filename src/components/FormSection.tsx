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

type formSectionProps = {
  sectionName: string,
  fields: {[key: string]: string},
  updater: (newData: string, section: string, field: string) => void
}

const FormSection: React.FC<formSectionProps> = ({sectionName, fields, updater}) => {
  return (
    <div>
      <h2>{sectionName}</h2>
      {Object.entries(fields).map(([field, value], index) => {
        return <FormInput 
          key={index * 2}
          field={field} 
          value={value} 
          updater={(e: React.ChangeEvent<HTMLInputElement>) => {
            updater(e.target.value, sectionName, field)
          }} />
      })}
    </div>
  )
}

export default FormSection
