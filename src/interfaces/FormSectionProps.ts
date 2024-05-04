import { FormArray, FormField } from "./DataForm"

interface FormSectionProps {
  sectionName: string,
  sectionData: FormField | FormArray,
  updater: (newData: string, section: string, field: string, id?: string) => void,
}

export default FormSectionProps