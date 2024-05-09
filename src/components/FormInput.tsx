import React from "react"
import FormInputProps from "../interfaces/FormInputProps"

const FormInput: React.FC<FormInputProps> = ({field, value, updater}) => {
  return (
    <label className="block">
      <span className="block text-hunt-navy capitalize mt-4 mb-2">{field}</span>
      <input className="bg-hunt-grey bg-opacity-90 rounded p-2 w-full" type="text" value={value} onChange={updater} />
    </label>
  )
}

export default FormInput