import React from "react"
import { useImmer } from "use-immer"

type InputProps = {
  handler: React.Dispatch<React.SetStateAction<object>>
  data: object
}

const Input: React.FC<InputProps> = ({data, handler}) => {
  return <form></form>
}

const ResumeBuilder = () => {
  const [data, setDate] = useImmer({
    "personal details": {
      "first name": "",
      "last name": "",
      "job title": "",
      "email address": "",
      "phone number": 0,
      "country": "",
      "city": ""
    }
  })

  return <></>
}

export default ResumeBuilder
