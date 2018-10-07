import {LatLng} from "./lat-lng"
import {Loc} from "./types"

interface ChosenLocationProps {
  location: Loc
  onRemove: () => void
}
export function ChosenLocation(props: ChosenLocationProps) {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{flexGrow: 1}}>
        {props.location.address}
        <LatLng {...props.location} />
      </div>
      <a
        href="#"
        style={{
          textDecoration: "none",
          color: "#333",
          opacity: 0.3,
        }}
        onClick={props.onRemove}
      >
        ✖
      </a>
    </div>
  )
}
