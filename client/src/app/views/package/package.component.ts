import { ApiService } from "./../../api/api.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-package",
  templateUrl: "./package.component.html",
})
export class PackageComponent {
  showAlert = false;
  errorMessage = "";
  packageForm = this.fb.group({
    description: ["", Validators.required],
    weight: [0, Validators.required],
    width: [0, Validators.required],
    height: [0, Validators.required],
    fromName: ["", Validators.required],
    fromAddress: ["", Validators.required],
    toName: ["", Validators.required],
    toAddress: ["", Validators.required],
    depth: [0, Validators.required],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    let formValue = this.packageForm.value;
    let data = {
      ...formValue,
      fromLocation: JSON.parse(localStorage.senderLocation),
      toLocation: JSON.parse(localStorage.receiverLocation),
    };

    this.apiService.createPackage(data).subscribe((res: any) => {
      if (res.data) {
        console.log(res.data);
        localStorage.removeItem("receiverLocation");
        localStorage.removeItem("senderLocation");
        this.router.navigate(["/admin/dashboard"]);
      }
    });
  }
}
