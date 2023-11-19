import { ApiService } from "./../../api/api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Socket } from "ngx-socket-io";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
})
export class DriverComponent implements OnInit {
  subscription: Subscription;
  driverForm = this.fb.group({
    delivery: "",
  });
  deliveryInfo;
  showAlert = false;
  alertMessage = "";
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private socket: Socket
  ) {
    this.subscription = interval(20000).subscribe((data) => {
      this.getLocation();
    });
  }

  ngOnInit(): void {
    this.alertMessage = "Enter delivery reference";
    this.socket.on("test", function (data) {
      console.log(data);
    });
  }
  handleSubmit() {
    this.apiService.getDeliveryById(this.driverForm.value.delivery).subscribe(
      (data: any) => {
        if (data.success) {
          this.deliveryInfo = data?.data;
          this.alertMessage = "";
          this.driverForm.setValue({
            delivery: "",
          });
        }
      },
      (err) => {
        this.alertMessage = err.error?.message;
      }
    );
  }
  handleClick(status) {
    console.log(status);
    this.socket.emit("status_changed", {
      delivery_id: this.deliveryInfo._id,
      status: status,
    });
    this.socket.on("delivery_updated", function (deliveryUpdate) {
      if (deliveryUpdate._id) {
        this.deliveryInfo = deliveryUpdate;
      }
    });
  }

  getLocation() {
    console.log(`location called`);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        if (this.deliveryInfo?._id) {
          this.socket.emit("location_changed", {
            delivery_id: this.deliveryInfo._id,
            location: { lat, lng },
          });
        }
        console.log({ lat, lng });
      });
    }

    this.socket.on("delivery_updated", function (deliveryUpdate) {
      if (deliveryUpdate._id) {
        
        this.deliveryInfo = deliveryUpdate;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
