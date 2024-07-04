import { Component, OnInit } from "@angular/core";
import { FundamentalNgxCoreModule, IllustratedMessageModule } from "@fundamental-ngx/core";
import { AccountService } from "../services/account-service.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "../models/account";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-account-list",
  standalone: true,
  imports: [FundamentalNgxCoreModule, CommonModule,IllustratedMessageModule],
  templateUrl: "./account-list.component.html",
  styleUrl: "./account-list.component.scss",
})
export class AccountListComponent implements OnInit {
  constructor(private accountService: AccountService){}
  
  sceneConfig = {
      scene: { url: 'assets/images/sapIllus-Scene-NoSearchResults.svg', id: 'sapIllus-Scene-NoSearchResults' },
      dialog: { url: 'assets/images/sapIllus-Dialog-NoSearchResults.svg', id: 'sapIllus-Dialog-NoSearchResults' }
  };
  
  
  accounts: Observable<Account[]> = new BehaviorSubject([]);

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts()
    this.accounts.subscribe(res => console.log(res))
  }
}
