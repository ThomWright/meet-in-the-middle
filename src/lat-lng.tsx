import {Coords} from "google-map-react"
import {THEME} from "./theme"

export function LatLng(props: Coords) {
  return (
    <div style={{color: THEME.lightGrey, fontSize: 10}}>
      {props.lat.toFixed(6)}, {props.lng.toFixed(6)}
    </div>
  )
}
