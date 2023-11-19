import { Component, Input, OnInit } from "@angular/core";

declare const google: any;

@Component({
  selector: "app-sender-map",
  templateUrl: "./sender-map.component.html",
})
export class SenderMapComponent implements OnInit {
  @Input() lat = "";
  @Input() lng = "";
  senderLatLng = {
    lat: this.lat,
    lng: this.lng,
  };
  constructor() {}

  ngOnInit(): void {
    console.log(`before init`, typeof this.lat);
    console.log(this.lng);
    let mapCanvas = document.getElementById("senderMap");
    let lat = this.lat;
    let lng = this.lng;

    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 17,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
      ],
    };

    let map = new google.maps.Map(mapCanvas, mapOptions);

    let marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      draggable: true,
      title: "Drag me",
    });

    const contentString =
      '<div class="info-window-content"><h2>Marker</h2>' +
      "<p>Move to select a place</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, "dragend", function () {
      let position = marker.getPosition();
      this.lat = position.lat();
      this.lng = position.lng();
      map.setCenter({ lat: this.lat, lng: this.lng });
      localStorage.setItem(
        "senderLocation",
        JSON.stringify({
          lat: this.lat,
          lng: this.lng,
        })
      );
    });
  }
}
