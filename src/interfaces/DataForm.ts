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

export type {FormField, FormArray, DataForm}