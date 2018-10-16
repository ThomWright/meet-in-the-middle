import * as React from "react"
import {Button} from "./button"
import {ChosenLocation, ChosenLocationState} from "./chosen-location"

const ZERO_MESSAGE = "Where are you?"
const ONE_MESSAGE = "Where are the people you're meeting?"

interface SelectedLocationsProps {
  locations: Array<ChosenLocationState>
  onReset: () => void
  findPub: () => void
  onRemove: (i: number) => void

  onMouseEnter: (i: number) => void
  onMouseLeave: (i: number) => void
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
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          {props.locations.map((l, i) => (
            <div style={{paddingTop: 8, paddingBottom: 8}} key={i}>
              <ChosenLocation
                key={i}
                location={l.location}
                onRemove={() => props.onRemove(i)}
                highlight={l.highlight}
                onMouseEnter={() => props.onMouseEnter(i)}
                onMouseLeave={() => props.onMouseLeave(i)}
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
