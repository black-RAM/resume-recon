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

export default FormInput