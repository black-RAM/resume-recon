const expandArray = (arr: string[]) => {
  return arr.reduce((obj: {[key: string]: string}, field) => {
    obj[field] = ""
    return obj
  }, {})
}

export default expandArray