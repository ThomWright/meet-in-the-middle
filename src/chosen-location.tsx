import {LatLng} from "./lat-lng"
import {Loc} from "./types"
import {THEME} from "./theme"
import {Card} from "./card"

export interface ChosenLocationState {
  location: Loc
  highlight: boolean
}

interface ChosenLocationProps extends ChosenLocationState {
  onRemove: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function ChosenLocation(props: ChosenLocationProps) {
  return (
    <Card
      highlight={props.highlight}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
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
