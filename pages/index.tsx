import * as React from "react"
import GoogleMapReact, {
  ChildComponentProps,
  ClickEventValue,
} from "google-map-react"
import Head from "next/head"
import config from "../config/secret.json"

const TOP_HEIGHT_PERCENT = 20

type Props = undefined
interface State {
  locations: Array<{lat: number; lng: number}>
  place?: google.maps.places.PlaceResult
}

export default class IndexPage extends React.Component<Props, State> {
  private placesService?: google.maps.places.PlacesService

  constructor(props: Props) {
    super(props)
    this.state = {
      locations: [],
    }
    this.findPub = this.findPub.bind(this)
    this.reset = this.reset.bind(this)
    this.onClickMap = this.onClickMap.bind(this)
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this)
  }

  private findPub() {
    const middle = {
      lat: 51.4598044,
      lng: -2.5868507,
    }
    if (!this.placesService) {
      throw new Error("Places service not initialised")
    }
    this.placesService.nearbySearch(
      {
        location: middle,
        type: "bar",
        rankBy: google.maps.places.RankBy.DISTANCE,
      },
      (results, status) => {
        console.log(results, status)
        this.setState(() => {
          return {
            place: results[0],
          }
        })
      },
    )
  }

  private reset() {
    this.setState(() => {
      return {
        locations: [],
        place: undefined,
      }
    })
  }

  // tslint:disable-next-line no-any
  private onGoogleApiLoaded({map, maps}: {map: any; maps: any}) {
    this.placesService = new maps.places.PlacesService(map)
  }

  private onClickMap({lat, lng}: ClickEventValue) {
    console.log(lat, lng)
    this.setState(prevState => {
      return {
        locations: [...prevState.locations, {lat, lng}],
      }
    })
  }

  public render() {
    return (
      <div>
        <Head>
          <title>Meet in the middle</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta name="description" content="Meet in the middle" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <style>{"* {margin: 0;}"}</style>
        <div
          style={{
            height: "100vh",
          }}
        >
          <div style={{height: TOP_HEIGHT_PERCENT.toString() + "%"}}>
            <p>Choose two or more locations on the map</p>
            {this.state.locations.map((l, i) => (
              <p key={i}>
                {l.lat} {l.lng}
              </p>
            ))}
            {(() => {
              if (this.state.locations.length > 1) {
                return <button onClick={this.findPub}>Find a pub!</button>
              }
            })()}
            {this.state.place && this.state.place.name}
            <button onClick={this.reset}>Reset</button>
          </div>
          <div
            style={{
              height: (100 - TOP_HEIGHT_PERCENT).toString() + "%",
              width: "100%",
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={
                {key: config.GOOGLE_API_KEY, libraries: "places"} as {
                  key: string
                }
              }
              onGoogleApiLoaded={this.onGoogleApiLoaded}
              yesIWantToUseGoogleMapApiInternals={true}
              defaultCenter={{
                lat: 51.4598044,
                lng: -2.5868507,
              }}
              defaultZoom={15}
              onClick={this.onClickMap}
            >
              {this.state.locations.map((l, i) => {
                return <Marker key={i} lat={l.lat} lng={l.lng} />
              })}
              {this.state.place && (
                <Marker
                  color="blue"
                  lat={this.state.place.geometry.location.lat()}
                  lng={this.state.place.geometry.location.lng()}
                />
              )}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    )
  }
}

interface MarkerProps extends ChildComponentProps {
  color?: string
}
function Marker(props: MarkerProps) {
  return (
    <div
      style={{
        borderRadius: "50%",
        backgroundColor: props.color || "red",
        width: "10px",
        height: "10px",
      }}
    />
  )
}
