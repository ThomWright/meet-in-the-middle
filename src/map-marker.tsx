import {ChildComponentProps} from "google-map-react"
import {THEME} from "./theme"

interface MarkerProps extends ChildComponentProps {
  color?: string
}
const CIRCLE_STYLE: React.CSSProperties = {
  borderRadius: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
}
export function Marker(props: MarkerProps) {
  return (
    <>
      <div
        style={{
          ...CIRCLE_STYLE,
          backgroundColor: props.color || THEME.defaultPinColor,
          width: 10,
          height: 10,
        }}
      />
      <div
        style={{
          ...CIRCLE_STYLE,
          backgroundColor: "white",
          width: 8,
          height: 8,
        }}
      />
      <div
        style={{
          ...CIRCLE_STYLE,
          backgroundColor: props.color || THEME.defaultPinColor,
          width: 4,
          height: 4,
        }}
      />
    </>
  )
}
