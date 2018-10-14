import {ChildComponentProps} from "google-map-react"
import {THEME} from "./theme"

interface MarkerProps extends ChildComponentProps {
  color?: string
}
export function Marker(props: MarkerProps) {
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: props.color || THEME.defaultPinColor,
        width: "10px",
        height: "10px",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}
