import { ImmerReducer } from "use-immer"
import { DataForm } from "../interfaces/DataForm"
import isFormArray from "../utils/isFormArray"
import expandArray from "../utils/expandArray"
import Action from "../interfaces/DataFormAction"


const reducer: ImmerReducer<DataForm, Action> = (draft, action) => {
  const selection = draft[action["section"]]

  if(action["type"] == "CREATE") {
    if(!isFormArray(selection)) {
      throw new Error("Action of type 'CREATE' can only be performed on a section of type FormArray")
    }
    
    selection["data"][crypto.randomUUID()] = expandArray(selection["fields"])
  } else if (action["type"] == "UPDATE") {
    if(!action["field"] || typeof action["payload"] !== "string") {
      throw new Error("action of type 'UPDATE' requires action.field.")
    }

    if(isFormArray(selection)) {
      if(!action["id"]) {
        throw new Error("action.section has type FormArray so action.id is required.")
      }

      selection["data"][action["id"]][action["field"]] = action["payload"]
    } else {
      selection[action["field"]] = action["payload"]
    }
  } else if (action["type"] == "DELETE") {
    if(!isFormArray(selection)) {
      throw new Error("Action of type 'DELETE' can only be performed on a section of type FormArray")
    }

    if(!action["id"]) {
      throw new Error("Action of type 'DELETE' requires an id.")
    }

    delete selection["data"][action["id"]]
  }
}

export default reducer