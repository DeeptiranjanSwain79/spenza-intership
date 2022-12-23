import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import positions from "./map.json";
import { Icon } from "leaflet";
import best_ from "./images/best.png";
import avg_ from "./images/average.png";
import worst_ from "./images/worst.png";
const worst = new Icon({
  iconUrl: worst_,
  iconSize: [25, 25],
});
const avg = new Icon({
  iconUrl: avg_,
  iconSize: [25, 25],
});
const best = new Icon({
  iconUrl: best_,
  iconSize: [25, 25],
});

const defaultPosition = [30.872062,13.433200];
function App() {
  return (
    <div className="container">
      <MapContainer center={defaultPosition} zoom={2.3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map(position => (
          <Marker
            icon={
              position.data <= 100000
                ? best
                : position.data > 100000 && position.data <= 600000
                ? avg
                : position.data > 600000
                ? worst
                : ""
            }
            position={[position.Latitude, position.Longitude]}
          >
            <Popup>
              {/* {position.Id} */}
              <b>{position.Location}</b> <br/>
              {position.data} YB <br/>
              Downloads: {position.Download} YB <br />
              Straming: {position.Stream} YB <br />
              Others: {position.Other}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="icons">
        <div className="icon-1">
          <img src={worst_} alt="" width={55} />
          <span>Data Usage &lt; 100000 YB</span>
        </div>
        <div className="icon-2">
          <img src={avg_} alt="" width={55} />
          <span>100000 Yb &lt; Data Usage &gt; 600000 YB</span>
        </div>
        <div className="icon-3">
          <img src={best_} alt="" width={55} />
          <span>600000 Yb &gt; Data Usage</span>
        </div>
      </div>
    </div>
  );
}

export default App;
