import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "../auth/auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class TradeService {
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  buy(amount: string) {
    this.http.post(BACKEND_URL + "buy", amount).subscribe(
      () => {
        this.router.navigate(["/account"]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }
}
