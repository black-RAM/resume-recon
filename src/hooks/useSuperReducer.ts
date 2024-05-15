import { useEffect } from "react"
import { ImmerReducer, useImmerReducer } from "use-immer"
import { DataForm } from "../interfaces/DataForm.ts"
import Action from "../interfaces/DataFormAction.ts"

/**
 * A custom hook that combines useImmerReducer with localStorage for state management.
 */
const useSuperReducer = (key: string, reducer: ImmerReducer<DataForm, Action>, initialState: DataForm): [DataForm, React.Dispatch<Action>] => {
  const [state, dispatch] = useImmerReducer(reducer, initialState, (arg) => {
    const storedState = localStorage.getItem(key)
    return storedState ? JSON.parse(storedState) as DataForm : arg
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, dispatch]
}

export default useSuperReducer