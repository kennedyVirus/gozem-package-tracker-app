import { ApiService } from "./../../../api/api.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-card-package",
  templateUrl: "./card-package.component.html",
})
export class CardPackageComponent implements OnInit {
  packages = [];
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPackages().subscribe((data: any) => {
      console.log(data);
      this.packages = data?.data;
    });
  }

  formatDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }
}
