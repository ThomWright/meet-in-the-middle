import {LatLng} from "./lat-lng"
import {Loc} from "./types"

interface ChosenLocationProps {
  location: Loc
}
export function ChosenLocation(props: ChosenLocationProps) {
  return (
    <div>
      {props.location.address}
      <LatLng {...props.location} />
    </div>
  )
}
