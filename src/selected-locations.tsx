import * as React from "react"
import {ChosenLocation} from "./chosen-location"
import {Location} from "./types"

interface SelectedLocationsProps {
  locations: Array<Location>
  onReset: () => void
  findPub: () => void
}
export function SelectedLocations(props: SelectedLocationsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{flexGrow: 2}}>
        {props.locations.length === 0 ? (
          <p>Choose two or more locations on the map</p>
        ) : null}
        {props.locations.map((l, i) => (
          <ChosenLocation key={i} location={l} />
        ))}
      </div>
      <div style={{flexShrink: 1}}>
        {props.locations.length > 1 ? (
          <button onClick={props.findPub}>Find a pub!</button>
        ) : (
          undefined
        )}

        <button onClick={props.onReset}>Reset</button>
      </div>
    </div>
  )
}
