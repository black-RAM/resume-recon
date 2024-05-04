import React from "react"
import FormInputProps from "../interfaces/FormInputProps"

const FormInput: React.FC<FormInputProps> = ({field, value, updater}) => {
  return (
    <div>
      <label>
        {field}: <input type="text" value={value} onChange={updater} />
      </label>
    </div>
  )
}

export default FormInput