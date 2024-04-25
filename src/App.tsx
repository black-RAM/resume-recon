import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"

interface DataField {
  [key: string]: string
}

interface DataForm {
  [key: string]: DataField | DataField[]
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
    },
    "education": []
  })

  const updateField = (newData: string, section: string, field: string) => {
    setData(draft => {   
      if(Array.isArray(data[section])) {
        
      } else {
        (draft[section] as DataField)[field] = newData
      }
    })
  }

  const formSections = Object.entries(data).map(([section, fields], index) => {
    return <FormSection sectionName={section} fields={fields} updater={updateField} key={index} />
  })

  return (
    <form>
      {formSections}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResumeBuilder
