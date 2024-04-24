import React from "react"
import { useImmer } from "use-immer"

interface DataField {
  [key: string]: string
}

interface DataForm {
  [key: string]: DataField
}

const ResumeBuilder = () => {
  const [data, setData] = useImmer<DataForm>({
    "personal details": {
      "first name": "",
      "last name": "",
      "job title": "",
      "email address": "",
      "phone number": "",
      "country": "",
      "city": ""
    }
  })

  return (
    <form>
      {Object.entries(data).map(([section, fields], index) => {
        return (
          <div key={index}>
            <h2>{section}</h2>
            {Object.entries(fields).map(([key, value], index) => {
              return (
                <div key={index}>
                  <label htmlFor={key}>{key}</label>
                  <input 
                  type="text" 
                  id={key} 
                  value={value} 
                  onChange={(e) => 
                    setData(draft => {
                      draft[section][key] = e.target.value
                    })
                    } />
                </div>
              )
            })}
          </div>
        )
      })}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResumeBuilder
