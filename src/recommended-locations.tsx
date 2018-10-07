import * as React from "react"

interface RecommendedLocatonsProps {
  places: Array<google.maps.places.PlaceResult>
}
export function RecommendedLocatons(props: RecommendedLocatonsProps) {
  const places = props.places.slice(0, 5)
  return (
    <div style={{height: "100%", overflowY: "scroll"}}>
      {places.map((p, i) => (
        <>
          {p.name}
          <div key={i} style={{paddingBottom: 8}}>
            <p style={{display: "inline", color: "grey"}}>{p.vicinity}</p>
          </div>
        </>
      ))}
    </div>
  )
}
