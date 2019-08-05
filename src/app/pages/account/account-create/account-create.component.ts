import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../../../auth/auth.service";
import { AccountService } from "../account.service";

import { Account } from "../account.model";

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  account: Account;
  isLoading = false;
  form: FormGroup;

  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(
    public authService: AuthService,
    public accountService: AccountService,
    private router: Router
    ) { }

  ngOnInit() {
    // Subscribe to auth updates.
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onCreateAccount() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.accountService
      .createAccount(
        this.form.value.firstName,
        this.form.value.lastName
      ).subscribe(() => {
        this.router.navigate(['/account']);
      });
    this.isLoading = false;
    this.form.reset();
  }

}
