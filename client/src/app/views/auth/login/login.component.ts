import { ApiService } from "./../../../api/api.service";
import { loginUser } from "../../../api/index";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  role = "";
  loginForm = this.fb.group({
    login: "",
    password: "",
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.role = this.router.getCurrentNavigation().extras.state?.role;
  }

  ngOnInit(): void {
    if (typeof this.role !== "string") {
      this.router.navigate(["/"]);
    }
    if (this.role === "ADMIN") {
      this.loginForm.setValue({
        login: "track.admin@gozem.com",
        password: "SuperApp@2022**",
      });
      this.loginForm.get("login").disable();
      this.loginForm.get("password").disable();
    }

    if (this.role === "DRIVER") {
      this.loginForm.setValue({
        login: "track.driver@gozem.com",
        password: "DriverApp@2022**",
      });
      this.loginForm.get("login").disable();
      this.loginForm.get("password").disable();
    }
  }

  handleSubmit() {
    this.apiService
      .loginUser(this.loginForm.value)
      .subscribe((response: any) => {
        if (!localStorage.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        localStorage.setItem("token", response?.data?.token);
        if (response?.data?.user?.role === "ADMIN") {
          this.router.navigate(["/admin/dashboard"]);
        }
        if (response?.data?.user?.role === "DRIVER") {
          this.router.navigate(["/admin/driver"]);
        }
      });

    //console.log(this.loginForm.value);
  }
}
