import React from "react"
import useSuperReducer from "./hooks/useSuperReducer"
import reducer from "./reducers/DataFormReducer"
import FormSection from "./components/FormSection"
import Preview from "./components/Preview"
import emptyForm from "./constants/emptyForm"
// @ts-ignore
import logo from "/logo.png"
import "./styles/App.css"

const ResumeBuilder = () => {
  const [form, dispatch] = useSuperReducer("data", reducer, emptyForm)

  const formSections = Object.entries(form).map(([section, data], index) => 
    <FormSection 
      sectionName={section} 
      sectionData={data} 
      dispatcher={dispatch}
      key={index} />
  )

  return (
    <div className="grid grid-cols-2 h-dvh">
      <section className="px-8 max-h-dvh overflow-scroll">
        <header className="flex justify-center items-center my-6">
          <img src={logo} alt="folded suit with tie" className="h-12" />
          <h1 className="text-2xl sm:text-4xl">Resume Reconnaissance</h1>
        </header>
        <form>
          {formSections}
        </form>
      </section>

      <section className="bg-hunt-navy flex flex-col items-center justify-center pb-8">
        <h2 className="text-center text-hunt-grey text-xl my-4">Preview</h2>
        <Preview data={form} />
      </section>
    </div>
  )
}

export default ResumeBuilder
