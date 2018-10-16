import * as React from "react"
import {THEME} from "./theme"
import {Card} from "./card"

export interface RecommendedPlaceState {
  highlight: boolean
  place: google.maps.places.PlaceResult
}

interface RecommendedLocatonsProps {
  places: Array<RecommendedPlaceState>

  onMouseEnter: (i: number) => void
  onMouseLeave: (i: number) => void
}
export function RecommendedLocatons(props: RecommendedLocatonsProps) {
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      {props.places.map((p, i) => (
        <div
          key={i}
          style={{
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Card
            highlight={p.highlight}
            onMouseEnter={() => props.onMouseEnter(i)}
            onMouseLeave={() => props.onMouseLeave(i)}
          >
            {p.place.name}
            <div key={i} style={{paddingBottom: 8}}>
              <p style={{display: "inline", color: THEME.lightGrey}}>
                {p.place.vicinity}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
