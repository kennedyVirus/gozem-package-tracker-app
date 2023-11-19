import { ApiService } from "./../../api/api.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-delivery",
  templateUrl: "./delivery.component.html",
})
export class DeliveryComponent implements OnInit {
  showAlert = false;
  packages = [];
  errorMessage = "";
  deliveryForm = this.fb.group({
    package: "",
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUndeliveredPackages().subscribe((data: any) => {
      this.packages = data?.data;
    });
  }

  handleSubmit() {
    let deliveryData = this.deliveryForm.value;
    this.apiService.createDelivery(deliveryData).subscribe((data: any) => {
      if (data?.success) {
        this.router.navigate(["/admin/dashboard"]);
      }
    });
    //console.log(this.loginForm.value);
  }
}
