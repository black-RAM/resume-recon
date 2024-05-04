import { FormArray, FormField } from "../interfaces/DataForm"


function isFormArray(object: FormArray | FormField): object is FormArray {
  return Array.isArray(object["fields"]) && typeof object.data == "object"
}

export default isFormArray