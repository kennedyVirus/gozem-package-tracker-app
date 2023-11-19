import { Component, Input, OnInit } from "@angular/core";

declare const google: any;

@Component({
  selector: "app-map-example",
  templateUrl: "./map-example.component.html",
})
export class MapExampleComponent implements OnInit {
  @Input() senderLat = "";
  @Input() senderLng = "";
  @Input() receiverLat = "";
  @Input() receiverLng = "";
  constructor() {}

  ngOnInit(): void {
    console.log(this.senderLat);
    console.log(this.senderLng);
    console.log(this.receiverLat);
    console.log(this.receiverLng);

    let mapCanvas = document.getElementById("map-canvas");
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(mapCanvas, {
      zoom: 14,
      center: { lat: this.senderLat, lng: this.senderLng },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    directionsRenderer.setMap(map);
    directionsService
      .route({
        origin: { lat: this.senderLat, lng: this.senderLng }, 
        destination: { lat: this.receiverLat, lng: this.receiverLng }, 
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
  }
}
