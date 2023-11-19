import { ApiService } from "./../../../api/api.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-card-delivery",
  templateUrl: "./card-delivery.component.html",
})
export class CardDeliveryComponent implements OnInit {
  deliveries = [];
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDeliveries().subscribe((data: any) => {
      console.log(data);
      this.deliveries = data?.data;
    });
  }

  formatDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }
}
