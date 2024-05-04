const expandArray = (arr: string[]) => {
  return arr.reduce((obj: {[key: string]: string}, field) => {
    obj[field] = field
    return obj
  }, {})
}

export default expandArray