import React, { Component, useRef } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker1 from "../../images/marker-icon-2x.png";
import marker2 from "../../images/marker-icon.png";
import marker3 from "../../images/marker-shadow.png";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: marker1,
  iconUrl: marker2,
  shadowUrl: marker3,
});

export default class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {map:null,lat: 0, lng: 0 };
  }
  mapRef = React.createRef();
  
  changePos (pos) {
    this.setState({position: pos});
    this.mapRef.current.flyTo(pos);
  }

  componentDidMount() {
    // Get location of user
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      /*console.log(latitude, longitude);*/
      this.state.map.flyTo(
        [latitude, longitude],
        "13",
        { animate: true }
      );
      this.setState({
        lat: latitude,
        lng: longitude,
      });
      
    };

    const error = () => {
      console.log("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    return (
      <div id="Map" style={{ overflowY: "hidden", overflowX: "hidden" }}>
        <MapContainer
          center={[this.state.lat,this.state.lng]}
          zoom="12"
          style={{ height: "92vh" }}
          whenCreated={map => this.setState({ map })}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[this.state.lat,this.state.lng]}>
            <Popup>Son Konum</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}
