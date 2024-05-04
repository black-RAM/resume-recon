import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"
import { DataForm } from "./interfaces/DataForm"
import expandArray from "./utils/expandArray"
import isFormArray from "./utils/isFormArray"
import "./styles/App.css"

const emptyForm = {
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
    "data": {}
  },
  "employment history": {
    "fields": ["Job Title", "Employer", "Start Date", "End Date", "Location", "Description"],
    "data": {}
  }
}

const ResumeBuilder = () => {
  const [data, setData] = useImmer<DataForm>(emptyForm)

  const updateField = (newData: string, section: string, field: string, id = "") => {
    setData(draft => {
      const dataSection = draft[section]
      if(isFormArray(dataSection)) {
        let dataFields = dataSection["data"][id]
        if(!dataFields) dataFields = expandArray(dataSection["fields"])
        dataFields[field] = newData
      } else {
        dataSection[field] = newData
      }
    })
  }

  const formSections = Object.entries(data).map(([section, data], index) => 
    <FormSection 
      sectionName={section} 
      sectionData={data} 
      updater={updateField}
      key={index} />
  )

  return (
    <form>
      {formSections}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ResumeBuilder
