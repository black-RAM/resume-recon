import { FormArray, FormField } from "./DataForm"
import Action from "./DataFormAction"

interface FormSectionProps {
  sectionName: string,
  sectionData: FormField | FormArray,
  dispatcher: React.Dispatch<Action>
}

export default FormSectionProps