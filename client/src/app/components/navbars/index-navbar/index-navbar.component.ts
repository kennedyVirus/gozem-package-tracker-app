import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavBarComponent implements OnInit {
  navbarOpen = false;
  user;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(localStorage.user);
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
