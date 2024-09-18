import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Necesario para solucionar problemas de iconos en Leaflet con React
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  return (
    <MapContainer
      //@ts-ignore
      center={[4.69, -74.2446]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[4.65, -74.06]}>
        <Popup>
          Lachoco-Latera <br /> Shipping Service.
        </Popup>
      </Marker>
      {/* <Marker position={[40.4168, -3.7038]}>
        <Popup>
          Madrid, España <br /> Shipping Hub.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default MapComponent;
