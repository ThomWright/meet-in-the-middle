import geolib from "geolib"
import {ClickEventValue} from "google-map-react"
import Head from "next/head"
import * as React from "react"
import config from "../config/secret.json"
import {ChosenLocationState} from "../src/chosen-location"
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

    const middle = geolib.getCenter(
      this.state.chosenLocations.map(cl => ({
        latitude: cl.location.lat,
        longitude: cl.location.lng,
      })),
    )

    if (!this.placesService) {
      throw new Error("Places service not initialised")
    }
    this.placesService.nearbySearch(
      {
        location: {
          lat: parseFloat((middle.latitude as any) as string),
          lng: parseFloat((middle.longitude as any) as string),
        },
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
            "* { \
              margin: 0; \
              box-sizing: border-box; \
              font-family: Helvetica,Arial,sans-serif; \
            }"
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
                      highlightIndex(i, true),
                    ),
                  }))
                }}
                onMouseLeave={i => {
                  this.setState(prevState => ({
                    chosenLocations: prevState.chosenLocations.map(
                      highlightIndex(i, false),
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
                      highlightIndex(i, true),
                    ),
                  }))
                }}
                onMouseLeave={i => {
                  this.setState(prevState => ({
                    recommendedPlaces: prevState.recommendedPlaces.map(
                      highlightIndex(i, false),
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

function highlightIndex<T extends {highlight: boolean}>(
  indexToHighlight: number,
  highlight: boolean,
) {
  return (x: T, xIndex: number): T => {
    return indexToHighlight === xIndex
      ? Object.assign({}, x, {
          highlight,
        })
      : x
  }
}
