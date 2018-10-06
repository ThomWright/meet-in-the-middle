import * as React from "react"

interface RecommendedLocatonsProps {
  place?: google.maps.places.PlaceResult
}
export function RecommendedLocatons(props: RecommendedLocatonsProps) {
  return (
    <div>
      {props.place && props.place.name}{" "}
      <p style={{display: "inline", color: "grey"}}>
        {props.place && props.place.vicinity}
      </p>
    </div>
  )
}
