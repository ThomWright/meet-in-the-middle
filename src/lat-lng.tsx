import {Coords} from "google-map-react"

export function LatLng(props: Coords) {
  return (
    <div style={{color: "grey", fontSize: 10}}>
      {props.lat.toFixed(6)}, {props.lng.toFixed(6)}
    </div>
  )
}
