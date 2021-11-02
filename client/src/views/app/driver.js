import React, { Component } from "react";
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
    this.state = {map:null,lat: 40.0550272, lng: 29.0848768 };

  }
  
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.location.replace(window.env.FRONTEND_URL + "/login");
    } else {
      fetch(window.env.BACKEND_URL + "/api/v1/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Driver Başarılı giriş");
        });
    }
    // Get location of user
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if(this.state.map !== null ){
        this.state.map.flyTo(
          [latitude, longitude],
          "13",
          { animate: true }
        );
      }else{
        console.log("map referance alınamadı")
      }
      /*console.log(latitude, longitude);*/
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
          whenCreated={map => this.setState({map: map })}
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
