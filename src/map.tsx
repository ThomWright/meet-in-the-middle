import GoogleMapReact, {ClickEventValue, MapTypeStyle} from "google-map-react"
import {THEME} from "./theme"
import {Loc} from "./types"
import {Marker} from "./map-marker"

interface Props {
  apiKey: string
  onGoogleApiLoaded(maps: {map: any; maps: any}): void
  chooseLocation(e: ClickEventValue): void
  chosenLocations: Array<Loc>
  recommendedPlaces: Array<google.maps.places.PlaceResult>
}

export function Map(props: Props) {
  return (
    <GoogleMapReact
      bootstrapURLKeys={
        {key: props.apiKey, libraries: "places"} as {
          key: string
        }
      }
      onGoogleApiLoaded={props.onGoogleApiLoaded}
      yesIWantToUseGoogleMapApiInternals={true}
      defaultCenter={{
        lat: 51.4598044,
        lng: -2.5868507,
      }}
      defaultZoom={15}
      onClick={props.chooseLocation}
      options={{
        styles: googleMapStyles(),
      }}
    >
      {props.chosenLocations.map((l, i) => {
        return <Marker key={i} lat={l.lat} lng={l.lng} />
      })}
      {props.recommendedPlaces.length > 0 && (
        <Marker
          color={THEME.suggestedPlacePin}
          lat={props.recommendedPlaces[0].geometry.location.lat()}
          lng={props.recommendedPlaces[0].geometry.location.lng()}
        />
      )}
    </GoogleMapReact>
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
