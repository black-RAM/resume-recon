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

  const updateField = (newData: string, section: string, field: string, id?: string) => {
    setData(draft => {
      const dataSection = (draft as DataForm)[section]
      if(isFormArray(dataSection)) {
        if(!id) throw new Error("Provide id for indexing FormArray 'data' object literal.");
        if(!dataSection["data"][id]) throw new Error(`First call createField for section ${section}.`)
        dataSection["data"][id][field] = newData
      } else {
        dataSection[field] = newData
      }
    })
  }

  const createField = (section: string) => {
    setData(draft => {
      const dataSection = (draft as DataForm)[section]
      if(!isFormArray(dataSection)) throw new Error("createField can only be called on FormArray sections.")
      dataSection["data"][crypto.randomUUID()] = expandArray(dataSection["fields"])
    })
  }

  const formSections = Object.entries(data).map(([section, data], index) => 
    <FormSection 
      sectionName={section} 
      sectionData={data} 
      updater={updateField}
      creator={createField}
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
