import { ApiService } from "./../../api/api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
})
export class ClientComponent implements OnInit {
  clientForm = this.fb.group({
    package: "",
  });
  packageInfo;
  showAlert = false;
  alertMessage = "";
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.alertMessage = "Enter your package reference";
  }

  handleSubmit() {
    console.log(this.clientForm.value);
    this.apiService.getPackageById(this.clientForm.value.package).subscribe(
      (data: any) => {
        if (data.success) {
          console.log(data?.data);
          if (!data?.data?.activeDelivery) {
            this.showAlert = true;
            this.alertMessage = "Delivery not scheduled";
          } else {
            this.packageInfo = data?.data;
            this.alertMessage = "";
          }
        }
      },
      (err) => {
        this.alertMessage = err.error?.message;
      }
    );
  }
}
