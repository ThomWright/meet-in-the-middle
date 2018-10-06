import * as React from "react"
import {Button} from "./button"
import {ChosenLocation} from "./chosen-location"
import {Loc} from "./types"

interface SelectedLocationsProps {
  locations: Array<Loc>
  onReset: () => void
  findPub: () => void
}
export function ChosenLocations(props: SelectedLocationsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{flexGrow: 2, overflowY: "scroll"}}>
        {props.locations.length === 0 ? (
          <p>Choose two or more locations on the map</p>
        ) : null}
        {props.locations.map((l, i) => (
          <div style={{paddingBottom: 8}}>
            <ChosenLocation key={i} location={l} />
          </div>
        ))}
      </div>
      <div>
        <div style={{paddingBottom: 8}}>
          <Button onClick={props.findPub}>Find a pub!</Button>
        </div>

        <Button onClick={props.onReset}>Reset</Button>
      </div>
    </div>
  )
}
