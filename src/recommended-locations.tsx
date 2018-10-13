import * as React from "react"
import {THEME} from "./theme"
import {Card} from "./card"

interface RecommendedLocatonsProps {
  places: Array<google.maps.places.PlaceResult>
}
export function RecommendedLocatons(props: RecommendedLocatonsProps) {
  const places = props.places.slice(0, 5)
  return (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {places.map((p, i) => (
        <div
          style={{
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Card>
            {p.name}
            <div key={i} style={{paddingBottom: 8}}>
              <p style={{display: "inline", color: THEME.lightGrey}}>
                {p.vicinity}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
