import {LatLng} from "./lat-lng"
import {Loc} from "./types"
import {THEME} from "./theme"
import {Card} from "./card"

interface ChosenLocationProps {
  location: Loc
  onRemove: () => void
  isOdd: boolean
}
export function ChosenLocation(props: ChosenLocationProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{flexGrow: 1}}>
          <div style={{paddingBottom: 8}}>{props.location.address}</div>
          <LatLng {...props.location} />
        </div>
        <a
          href="#"
          style={{
            paddingLeft: 8,
            textDecoration: "none",
            color: THEME.grey,
            opacity: 0.3,
          }}
          onClick={props.onRemove}
        >
          ✖
        </a>
      </div>
    </Card>
  )
}
