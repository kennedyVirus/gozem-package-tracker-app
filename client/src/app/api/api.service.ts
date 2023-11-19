import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private API_SERVER = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  getOptions() {
    if (localStorage.token) {
      return {
        headers: {
          authorization: localStorage.token,
        },
      };
    }
  }

  public getPackages() {
    return this.httpClient.get(
      `${this.API_SERVER}/api/package`,
      this.getOptions()
    );
  }

  public getUndeliveredPackages() {
    return this.httpClient.get(
      `${this.API_SERVER}/api/package/undelivered`,
      this.getOptions()
    );
  }

  public getDeliveries() {
    return this.httpClient.get(
      `${this.API_SERVER}/api/delivery`,
      this.getOptions()
    );
  }

  public getPackageById(id) {
    return this.httpClient.get(
      `${this.API_SERVER}/api/package/${id}`,
      this.getOptions()
    );
  }

  public getDeliveryById(id) {
    return this.httpClient.get(
      `${this.API_SERVER}/api/delivery/${id}`,
      this.getOptions()
    );
  }

  public createDelivery(data) {
    return this.httpClient.post(
      `${this.API_SERVER}/api/delivery`,
      data,
      this.getOptions()
    );
  }

  public createPackage(data) {
    return this.httpClient.post(
      `${this.API_SERVER}/api/package`,
      data,
      this.getOptions()
    );
  }

  public loginUser(data) {
    return this.httpClient.post(`${this.API_SERVER}/auth`, data);
  }
}
