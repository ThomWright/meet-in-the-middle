import * as React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}
export function Button(props: ButtonProps) {
  return (
    <button
      style={{
        width: "100%",
        height: 40,
        padding: 0,
        margin: 0,
        border: 0,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
