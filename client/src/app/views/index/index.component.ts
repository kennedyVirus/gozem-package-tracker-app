import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
})
export class IndexComponent implements OnInit {
  roleForm = this.fb.group({
    role: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      if (user?.role === "ADMIN") {
        this.router.navigate(["/admin/dashboard"]);
      }
      if (user?.role === "DRIVER") {
        this.router.navigate(["/admin/driver"]);
      }
    }
  }
  handleSubmit() {
    let role = this.roleForm.value.role;
    if (role === "CUSTOMER") {
      this.router.navigate(["/client"]);
    } else {
      this.router.navigate(["/auth"], { state: { role } });
    }
  }
}
