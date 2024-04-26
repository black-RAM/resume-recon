import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"

interface DataForm {
  [key: string]: {
    [key: string]: string | ({[key: string]: string} | string)[]
  }
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
    "education": {
      "fields": ["School", "Degree", "Start Date", "End Date", "Location", "Description"],
      "data": []
    }
  })

  const updateField = (newData: string, section: string, field: string) => {
    setData(draft => {   
      if(Array.isArray(data[section]["fields"])) {
        
      } else {
        draft[section][field] = newData
      }
    })
  }

  const formSections = Object.entries(data).map(([section, data], index) => {
    return <FormSection sectionName={section} sectionData={data} updater={updateField} key={index} />
  })

  return (
    <form>
      {formSections}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResumeBuilder
