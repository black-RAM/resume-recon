import uuid from "./uuid";

interface Action{
  type: "CREATE" | "UPDATE",
  section: string,
  field?: string,
  payload?: string,
  id?: uuid
}

export default Action