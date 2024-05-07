import { FormField } from "./DataForm";
import Action from "./DataFormAction";
import uuid from "./uuid";

interface FormGroupProps {
  section: string,
  fields: FormField,
  dispatcher: React.Dispatch<Action>,
  id?: uuid
}

export default FormGroupProps