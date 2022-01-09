import React, { Component } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker1 from "../../images/marker-icon-2x.png";
import marker2 from "../../images/marker-icon.png";
import marker3 from "../../images/marker-shadow.png";
import { Icon } from "leaflet";
import marker4 from "../../images/driverIcon.png";
import { Button } from "react-bootstrap";
import Routing from "./Routing";
import Dropdown from "react-bootstrap/Dropdown";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: marker1,
  iconUrl: marker2,
  shadowUrl: marker3,
});
const covidIcon = new Icon({
  iconUrl: marker4,
  iconSize: [35, 35],
});

export default class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userpk: null,
      map: null,
      lat: 40.0550272,
      lng: 29.0848768,
      markers: [],
      destinationCity: {},
      forminputlongitude: 0,
      forminputlatitude: 0,
    };
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
          console.log(data);
          this.setState({ userpk: data.pk });
          console.log(this.state.userpk);
          console.log("Driver Başarılı giriş");
        });
      fetch(window.env.BACKEND_URL + "/api/v1/users/travellers")
        .then((response) => response.json())
        .then((response) => {
          this.setState({ markers: response });
        });
    }
    // Get location of user
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (this.state.map !== null) {
        this.state.map.flyTo([latitude, longitude], "13", { animate: true });
        fetch(window.env.BACKEND_URL + "/api/v1/users/" + this.state.userpk, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pk: this.state.userpk,
            longitude: longitude,
            latitude: latitude,
          }),
        });
        console.log("user navigation güncellendi");
      } else {
        console.log("map referance alınamadı");
      }
      /*console.log(latitude, longitude);*/
      this.setState({
        lat: latitude,
        lng: longitude,
      });
      console.log(latitude);
    };
    const error = () => {
      console.log("Unable to retrieve your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }


  render() {
    return (
      <div id="Map" style={{ overflowY: "hidden", overflowX: "hidden" }}>
        <div id="users">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Find Your Passenger
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.state.markers.length > 0 &&
                this.state.markers.map((marker) => (
                  <Dropdown.Item
                    onClick={(e) => {
                      this.setState({
                        destinationCity: {
                          lat: marker.latitude,
                          lng: marker.longitude,
                        },
                      });
                    }}
                  >
                    {marker.pk}-{marker.first_name} {marker.last_name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
        <MapContainer
          center={[this.state.lat, this.state.lng]}
          zoom="12"
          style={{ height: "92vh" }}
          whenCreated={(map) => this.setState({ map: map })}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[this.state.lat, this.state.lng]} icon={covidIcon}>
            <Popup>Last Location</Popup>
          </Marker>
          {this.state.markers.length > 0 &&
            this.state.markers.map((marker) => (
              <Marker position={[marker.latitude, marker.longitude]}>
                <Popup>
                  <h3>
                    <b>{marker.pk}</b>
                  </h3>{" "}
                  <b>Traveller Username:</b> {marker.username} <br></br>{" "}
                  <b>Email:</b> {marker.email}
                  <br></br> <b>Name Surname:</b> {marker.first_name}{" "}
                  {marker.last_name}
                  <br></br>
                  <Button
                    style={{
                      textAlign: "center",
                    }}
                    variant="success"
                    value={"asfa"}
                    onClick={(e) => {
                      this.setState({
                        destinationCity: {
                          lat: marker.latitude,
                          lng: marker.longitude,
                        },
                      });
                    }}
                  >
                    Take Direction
                  </Button>
                </Popup>
              </Marker>
            ))}

          <Routing
            sourceCity={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
            destinationCity={this.state.destinationCity}
          />
        </MapContainer>
      </div>
    );
  }
}
