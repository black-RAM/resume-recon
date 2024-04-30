import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"

// interfaces
interface FormField {
  [field: string]: string
}

interface FormArray{
  "fields": string[],
  "data": {
    [id: string]: FormField
  }
}

interface DataForm {
  [section: string]: FormField | FormArray
}

function isFormArray(object: FormArray | FormField): object is FormArray {
  return Array.isArray(object["fields"]) && typeof object.data == "object"
}

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

  const expandDataFields = (fields: string[]) => {
    return fields.reduce((obj: FormField, field) => {
      obj[field] = field
      return obj
    }, {})
  }

  const updateField = (newData: string, section: string, field: string, id = "") => {
    setData(draft => {
      const dataSection = draft[section]
      if(isFormArray(dataSection)) {
        let dataFields = dataSection["data"][id]
        if(!dataFields) dataFields = expandDataFields(dataSection["fields"])
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
