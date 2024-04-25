import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"

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

  const updateField = (newData: string, section: string, field: string) => {
    setData(draft => {
      draft[section][field] = newData
    })
  }

  return (
    <form>
      {Object.entries(data).map(([section, fields], index) => {
        return <FormSection sectionName={section} fields={fields} updater={updateField} />
      })}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResumeBuilder
