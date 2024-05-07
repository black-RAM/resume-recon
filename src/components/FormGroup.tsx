import React from "react"
import FormInput from "./FormInput"
import FormGroupProps from "../interfaces/FormGroupProps"

const FormGroup: React.FC<FormGroupProps> = ({section, fields, dispatcher, id}) => {
  return <div>{
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