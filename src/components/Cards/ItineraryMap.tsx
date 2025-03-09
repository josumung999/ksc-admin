// components/RouteMap.tsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import Leaflet and the default marker images
// @ts-ignore
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Only execute on the client
if (typeof window !== "undefined") {
  // Remove the default icon URLs from the prototype
  delete L.Icon.Default.prototype._getIconUrl;

  // Merge the options with our imported images
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}

interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteMapProps {
  routeData: Coordinate[];
}

export default function RouteMap({ routeData }: RouteMapProps): JSX.Element {
  // Kinshasa center as a LatLngExpression
  const kinshasaCenter: any = [-4.44193, 15.266293];

  // Build polyline positions from routeData
  const polylinePositions: any[] = routeData.map((point) => [
    point.lat,
    point.lng,
  ]);

  return (
    <MapContainer
      // @ts-ignore
      center={kinshasaCenter}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={polylinePositions} pathOptions={{ color: "blue" }} />

      {/* Option 1: Using Marker to show a standard icon */}
      {routeData.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng] as any}>
          <Popup>Position {index + 1}</Popup>
        </Marker>
      ))}

      {/* Option 2: Using CircleMarker to show a dot instead of a default marker */}
      {/*
      {routeData.map((point, index) => (
        <CircleMarker
          key={index}
          center={[point.lat, point.lng] as LatLngExpression}
          radius={5}  // Adjust size as needed
          pathOptions={{ color: 'red' }} // Customize color
        />
      ))}
      */}
    </MapContainer>
  );
}
