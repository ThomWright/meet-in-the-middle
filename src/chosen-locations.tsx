import * as React from "react"
import {Button} from "./button"
import {ChosenLocation} from "./chosen-location"
import {Loc} from "./types"

const ZERO_MESSAGE = "Where are you?"
const ONE_MESSAGE = "Where are the people you're meeting?"

interface SelectedLocationsProps {
  locations: Array<Loc>
  onReset: () => void
  findPub: () => void
  onRemove: (i: number) => void
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 2,
          overflowY: "scroll",
        }}
      >
        <div>
          {props.locations.map((l, i) => (
            <div style={{paddingTop: 8, paddingBottom: 8}} key={i}>
              <ChosenLocation
                key={i}
                location={l}
                onRemove={() => props.onRemove(i)}
                isOdd={i % 2 === 1}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p>
            {props.locations.length === 0
              ? ZERO_MESSAGE
              : props.locations.length === 1
                ? ONE_MESSAGE
                : null}
          </p>
        </div>
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
