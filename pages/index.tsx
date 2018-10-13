import GoogleMapReact, {
  ChildComponentProps,
  ClickEventValue,
  Coords,
  MapTypeStyle,
} from "google-map-react"
import Head from "next/head"
import * as React from "react"
import config from "../config/secret.json"
import {ChosenLocations} from "../src/chosen-locations"
import {Layout} from "../src/layout"
import {RecommendedLocatons} from "../src/recommended-locations"
import {THEME} from "../src/theme"
import {Loc} from "../src/types"

type Props = undefined
interface State {
  chosenLocations: Array<Loc>
  recommendedPlaces: Array<google.maps.places.PlaceResult>
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

    const middle = getMiddle(this.state.chosenLocations)

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
            recommendedPlaces: results,
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
            chosenLocations: [...prevState.chosenLocations, loc],
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
                onClick={this.chooseLocation}
                options={{
                  styles: googleMapStyles(),
                }}
              >
                {this.state.chosenLocations.map((l, i) => {
                  return <Marker key={i} lat={l.lat} lng={l.lng} />
                })}
                {this.state.recommendedPlaces.length > 0 && (
                  <Marker
                    color={THEME.suggestedPlacePin}
                    lat={this.state.recommendedPlaces[0].geometry.location.lat()}
                    lng={this.state.recommendedPlaces[0].geometry.location.lng()}
                  />
                )}
              </GoogleMapReact>
            ),
            recommendedLocations: (
              <RecommendedLocatons places={this.state.recommendedPlaces} />
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
        backgroundColor: props.color || THEME.defaultPinColor,
        width: "10px",
        height: "10px",
      }}
    />
  )
}

function googleMapStyles(): Array<MapTypeStyle> {
  return [
    {elementType: "geometry", stylers: [{color: "#f5f5f5"}]} as any,
    {elementType: "labels.icon", stylers: [{visibility: "off"}]} as any,
    {elementType: "labels.text.fill", stylers: [{color: "#616161"}]} as any,
    {elementType: "labels.text.stroke", stylers: [{color: "#f5f5f5"}]} as any,
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{color: "#bdbdbd"}],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{color: "#eeeeee"}],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{color: "#757575"}],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{color: "#e5e5e5"}],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{color: "#9e9e9e"}],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{color: "#ffffff"}],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{color: "#757575"}],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{color: "#dadada"}],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{color: "#616161"}],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{color: "#9e9e9e"}],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{color: "#e5e5e5"}],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{color: "#eeeeee"}],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{color: "#c9c9c9"}],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{color: "#9e9e9e"}],
    },
  ]
}
