import React from "react"
import { useImmer } from "use-immer"
import FormSection from "./components/FormSection"
import Preview from "./components/Preview"
import { DataForm } from "./interfaces/DataForm"
import emptyForm from "./constants/emptyForm"
import expandArray from "./utils/expandArray"
import isFormArray from "./utils/isFormArray"
// @ts-ignore
import logo from "/logo.png"
import "./styles/App.css"

const ResumeBuilder = () => {
  const [data, setData] = useImmer(emptyForm)

  const updateField = (newData: string, section: string, field: string, id = "") => {
    setData(draft => {
      const dataSection = (draft as DataForm)[section]
      if(isFormArray(dataSection)) {
        if(!dataSection["data"][id]) dataSection["data"][id] = expandArray(dataSection["fields"])
        dataSection["data"][id][field] = newData
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
    <div className="grid grid-cols-2">
      <section>
        <header>
          <img src={logo} alt="folded suit with tie" />
          <h1 className="text-lg">Resume Reconnaissance</h1>
        </header>
        <form>
          {formSections}
          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        <Preview data={data} />
      </section>
    </div>
  )
}

export default ResumeBuilder
