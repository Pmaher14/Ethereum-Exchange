import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { TradeService } from "../trade.service";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  isLoading = false;

  constructor(public tradeService: TradeService) { }

  ngOnInit() {
  }

  onBuy(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.tradeService.buy(form.value.amount);
  }

}
