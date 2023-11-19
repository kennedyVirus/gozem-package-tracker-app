import { ReceiverMapComponent } from "./components/maps/receiver-map/receiver-map.component";
import { SenderMapComponent } from "./components/maps/sender-map/sender-map.component";
import { DeliveryComponent } from "./views/delivery/delivery.component";
import { PackageComponent } from "./views/package/package.component";
import { CardPackageComponent } from "./components/cards/card-package/card-package.component";
import { CardDeliveryComponent } from "./components/cards/card-delivery/card-deliver.component";
import { DriverComponent } from "./views/driver/driver.component";
import { ClientComponent } from "./views/client/client.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";

import { LoginComponent } from "./views/auth/login/login.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";

// components for views and layouts

import { IndexNavBarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { LayoutComponent } from "./layouts/layout.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
const config: SocketIoConfig = {
  url: "http://localhost:4000",
  options: {
    transports: ["websocket"],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    FooterSmallComponent,
    MapExampleComponent,
    IndexNavBarComponent,
    MapsComponent,
    LoginComponent,
    IndexComponent,
    ClientComponent,
    DriverComponent,
    CardDeliveryComponent,
    CardPackageComponent,
    LayoutComponent,
    PackageComponent,
    DeliveryComponent,
    SenderMapComponent,
    ReceiverMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
