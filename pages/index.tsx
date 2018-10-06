import GoogleMapReact, {
  ChildComponentProps,
  ClickEventValue,
  Coords,
} from "google-map-react"
import Head from "next/head"
import * as React from "react"
import config from "../config/secret.json"
import {Layout} from "../src/layout"
import {RecommendedLocatons} from "../src/recommended-locations"
import {SelectedLocations} from "../src/selected-locations"
import {Loc} from "../src/types"

type Props = undefined
interface State {
  locations: Array<Loc>
  place?: google.maps.places.PlaceResult
}

function getMiddle(locations: Array<Coords>): Coords {
  const sum = locations.reduce(
    (prev, curr) => ({lat: prev.lat + curr.lat, lng: prev.lng + curr.lng}),
    {lat: 0, lng: 0},
  )

  return {
    lat: sum.lat / locations.length,
    lng: sum.lng / locations.length,
  }
}

export default class IndexPage extends React.Component<Props, State> {
  private placesService?: google.maps.places.PlacesService
  private geocoder?: google.maps.Geocoder

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
    const middle = getMiddle(this.state.locations)

    console.log(middle)

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
    this.geocoder = new maps.Geocoder()
  }

  private onClickMap({lat, lng}: ClickEventValue) {
    if (!this.geocoder) {
      throw new Error("Geocoder not initialised")
    }
    this.geocoder.geocode(
      {
        location: {
          lat,
          lng,
        },
      },
      (result, status) => {
        const loc: Loc = {
          lat,
          lng,
        }
        if (result.length > 0) {
          const place = result[0]
          loc.address = place.formatted_address
        }
        this.setState(prevState => {
          return {
            locations: [...prevState.locations, loc],
          }
        })
      },
    )
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
        <Layout>
          {{
            selectedLocations: (
              <SelectedLocations
                locations={this.state.locations}
                onReset={this.reset}
                findPub={this.findPub}
              />
            ),
            map: (
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
            ),
            recommendedLocations: (
              <RecommendedLocatons place={this.state.place} />
            ),
          }}
        </Layout>
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
