import React, { useEffect, useRef } from "react"

interface Props {
  maxWidth: number, 
  maxHeight: number,
  overflowTracker: React.Dispatch<React.SetStateAction<number>>,
  children?: React.ReactNode
}

const A4: React.FC<Props> = ({maxWidth, maxHeight, overflowTracker, children}) => {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const portrait = maxWidth * Math.sqrt(2)
  const landscape = maxHeight / Math.sqrt(2)
  const width = Math.min(landscape, maxWidth)
  const height = Math.min(portrait, maxHeight)

  useEffect(() => {
    const page = pageRef.current
    if(!page) return
    const overflow = page.scrollHeight - page.clientHeight
    overflowTracker(overflow)
  }, [pageRef.current])

  return (
    <div ref={pageRef} style={{width: width, height: height, fontSize: width / 20}}>
      {children}
    </div>
  )
}

export default A4