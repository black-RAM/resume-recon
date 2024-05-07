import React from "react"
import { useImmerReducer } from "use-immer"
import reducer from "./reducers/DataFormReducer"
import FormSection from "./components/FormSection"
import Preview from "./components/Preview"
import emptyForm from "./constants/emptyForm"
// @ts-ignore
import logo from "/logo.png"
import "./styles/App.css"

const ResumeBuilder = () => {
  const [form, dispatch] = useImmerReducer(reducer, emptyForm)

  const formSections = Object.entries(form).map(([section, data], index) => 
    <FormSection 
      sectionName={section} 
      sectionData={data} 
      dispatcher={dispatch}
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
        <Preview data={form} />
      </section>
    </div>
  )
}

export default ResumeBuilder
