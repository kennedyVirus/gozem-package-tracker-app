import { DeliveryComponent } from './views/delivery/delivery.component';
import { PackageComponent } from "./views/package/package.component";
import { LayoutComponent } from "./layouts/layout.component";
import { DriverComponent } from "./views/driver/driver.component";
import { ClientComponent } from "./views/client/client.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
// auth views
import { LoginComponent } from "./views/auth/login/login.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: LayoutComponent,
    children: [
      { path: "driver", component: DriverComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "package/create", component: PackageComponent },
      { path: "delivery/create", component: DeliveryComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: LayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "", component: IndexComponent },
  { path: "client", component: ClientComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
