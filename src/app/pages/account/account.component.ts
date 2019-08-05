import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { AccountService } from "./account.service";

import { Account } from "./account.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account: Account;
  isLoading = false;

  firstName = '';
  lastName = '';
  balance = '';

  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(
    public authService: AuthService,
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    // Subscribe to auth updates.
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.accountService.getAccount(this.userId).subscribe(account => {
      if (account == null) {
        this.router.navigate(['/account/create']);
        return;
      }
      this.firstName = account.firstName;
      this.lastName = account.lastName;
      this.balance = account.balance;
    });

  }
}
