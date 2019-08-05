import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { Account } from "./account.model";

const BACKEND_URL = environment.apiUrl + "/account/";

@Injectable({ providedIn: "root" })
export class AccountService {

  constructor(private http: HttpClient, private router: Router) {}

  getAccount(id: string) {
    return this.http.get<{
      _id: string;
      firstName: string;
      lastName: string;
      phone: string;
      country: string;
      state: string;
      balance: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  createAccount(firstName: string, lastName: string, phone: string, country: string, state: string) {
    const accountData: Account = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      country: country,
      state: state,
      balance: '0',
      creator: null
    };
    return this.http.post<{ message: string; account: Account }>(
      BACKEND_URL,
      accountData
    );
  }
}
