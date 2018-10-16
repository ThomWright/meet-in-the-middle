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
          width: THEME.paddingBase * 2,
          height: THEME.paddingBase * 2,
        }}
      />
      <div
        style={{
          ...CIRCLE_STYLE,
          backgroundColor: "white",
          width: THEME.paddingBase * 1.5,
          height: THEME.paddingBase * 1.5,
        }}
      />
      <div
        style={{
          ...CIRCLE_STYLE,
          backgroundColor: props.color || THEME.defaultPinColor,
          width: THEME.paddingBase,
          height: THEME.paddingBase,
        }}
      />
    </>
  )
}
