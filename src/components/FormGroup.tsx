import React from "react"
import FormInput from "./FormInput"
import FormGroupProps from "../interfaces/FormGroupProps"

const FormGroup: React.FC<FormGroupProps> = ({section, fields, dispatcher, id}) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 mb-4">{
    Object.entries(fields).map(([field, value], index) => 
      <FormInput 
        key={index}
        field={field}
        value={value}
        updater={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatcher({type: "UPDATE", payload: e.target.value, section, field, id})
        }}
      />
    )
  }</div>
}

export default FormGroup