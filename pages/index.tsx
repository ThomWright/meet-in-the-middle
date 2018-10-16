import {ClickEventValue, Coords} from "google-map-react"
import Head from "next/head"
import * as React from "react"
import {ChosenLocationState} from "../src/chosen-location.jsx"
import config from "../config/secret.json"
import {ChosenLocations} from "../src/chosen-locations"
import {Layout} from "../src/layout"
import {Map} from "../src/map"
import {
  RecommendedLocatons,
  RecommendedPlaceState,
} from "../src/recommended-locations"
import {Loc} from "../src/types"

type Props = undefined
interface State {
  chosenLocations: Array<ChosenLocationState>
  recommendedPlaces: Array<RecommendedPlaceState>
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
      chosenLocations: [],
      recommendedPlaces: [],
    }
    this.findPub = this.findPub.bind(this)
    this.reset = this.reset.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
    this.removeChosenLocation = this.removeChosenLocation.bind(this)
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this)
  }

  private findPub() {
    if (this.state.chosenLocations.length < 2) {
      return
    }

    const middle = getMiddle(this.state.chosenLocations.map(cl => cl.location))

    if (!this.placesService) {
      throw new Error("Places service not initialised")
    }
    this.placesService.nearbySearch(
      {
        location: middle,
        type: "bar",
        rankBy: google.maps.places.RankBy.DISTANCE,
      },
      results => {
        this.setState(() => {
          return {
            recommendedPlaces: results.slice(0, 5).map(place => ({
              highlight: false,
              place,
            })),
          }
        })
      },
    )
  }

  private reset() {
    this.setState(() => {
      return {
        chosenLocations: [],
        recommendedPlaces: [],
      }
    })
  }

  // tslint:disable-next-line no-any
  private onGoogleApiLoaded({map, maps}: {map: any; maps: any}) {
    this.placesService = new maps.places.PlacesService(map)
    this.geocoder = new maps.Geocoder()
  }

  private chooseLocation({lat, lng}: ClickEventValue) {
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
      result => {
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
            chosenLocations: [
              ...prevState.chosenLocations,
              {highlight: false, location: loc},
            ],
          }
        })
      },
    )
  }

  private removeChosenLocation(index: number) {
    this.setState(() => ({
      chosenLocations: this.state.chosenLocations.filter((_, i) => i !== index),
    }))
  }

  public render() {
    return (
      <div>
        <Head>
          <title>Meet in the middle</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="description" content="Meet in the middle" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <style>
          {
            '* { \
              margin: 0; \
              box-sizing: border-box; \
              font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; \
            }'
          }
        </style>
        <Layout>
          {{
            selectedLocations: (
              <ChosenLocations
                locations={this.state.chosenLocations}
                onReset={this.reset}
                findPub={this.findPub}
                onRemove={this.removeChosenLocation}
                onMouseEnter={i => {
                  this.setState(prevState => ({
                    chosenLocations: prevState.chosenLocations.map(
                      (l, lIndex) => {
                        return i === lIndex
                          ? {
                              ...l,
                              highlight: true,
                            }
                          : l
                      },
                    ),
                  }))
                }}
                onMouseLeave={i => {
                  this.setState(prevState => ({
                    chosenLocations: prevState.chosenLocations.map(
                      (l, lIndex) => {
                        return i === lIndex
                          ? {
                              ...l,
                              highlight: false,
                            }
                          : l
                      },
                    ),
                  }))
                }}
              />
            ),
            map: (
              <Map
                apiKey={config.GOOGLE_API_KEY}
                chooseLocation={this.chooseLocation}
                onGoogleApiLoaded={this.onGoogleApiLoaded}
                chosenLocations={this.state.chosenLocations}
                recommendedPlaces={this.state.recommendedPlaces}
              />
            ),
            recommendedLocations: (
              <RecommendedLocatons
                places={this.state.recommendedPlaces}
                onMouseEnter={i => {
                  this.setState(prevState => ({
                    recommendedPlaces: prevState.recommendedPlaces.map(
                      (l, lIndex) => {
                        return i === lIndex
                          ? {
                              ...l,
                              highlight: true,
                            }
                          : l
                      },
                    ),
                  }))
                }}
                onMouseLeave={i => {
                  this.setState(prevState => ({
                    recommendedPlaces: prevState.recommendedPlaces.map(
                      (l, lIndex) => {
                        return i === lIndex
                          ? {
                              ...l,
                              highlight: false,
                            }
                          : l
                      },
                    ),
                  }))
                }}
              />
            ),
          }}
        </Layout>
      </div>
    )
  }
}
