import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./pages/home/home.component";
import { AccountComponent } from "./pages/account/account.component";
import { AccountCreateComponent } from "./pages/account/account-create/account-create.component";
import { BuyComponent } from "./components/buy/buy.component";
import { LendComponent } from "./components/lend/lend.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "buy", component: BuyComponent, canActivate: [AuthGuard] },
  { path: "lend", component: LendComponent, canActivate: [AuthGuard] },
  { path: "account", component: AccountComponent, canActivate: [AuthGuard] },
  { path: "account/create", component: AccountCreateComponent, canActivate: [AuthGuard] },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
