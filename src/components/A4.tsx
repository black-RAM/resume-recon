import React, { useEffect, useRef } from "react"

interface Props {
  maxWidth: number, 
  maxHeight: number,
  overflowAlert: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode
}

const A4: React.FC<Props> = ({maxWidth, maxHeight, overflowAlert, children}) => {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const portrait = maxWidth * Math.sqrt(2)
  const landscape = maxHeight / Math.sqrt(2)
  const width = Math.min(landscape, maxWidth)
  const height = Math.min(portrait, maxHeight)

  useEffect(() => {
    const page = pageRef.current
    if(page) overflowAlert(page.clientHeight < page.scrollHeight)
  }, [pageRef.current])

  return (
    <div ref={pageRef} style={{width: width, height: height, fontSize: width / 20}} className="overflow-hidden">
      {children}
    </div>
  )
}

export default A4