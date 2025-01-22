import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { HttpBinService } from '../services/httpbin-service.service';
import { PortalLuigiContextService } from '../services/luigi-context.service';
import { DeleteHttpBinResponse, HttpBin } from '../models/httpbins';
import { first, mergeMap, Observable, tap } from 'rxjs';
import { linkManager, uxManager } from '@luigi-project/client';
import { MutationResult } from 'apollo-angular';
import { ApolloError } from '@apollo/client';

@Component({
  standalone: true,
  imports: [CommonModule, FundamentalNgxCoreModule],
  templateUrl: './httpbin-overview.component.html',
})
export class HttpBinOverviewComponent {
  constructor(
    private accountService: HttpBinService,
    private luigiContextService: PortalLuigiContextService
  ){}

  account: Observable<HttpBin> = new Observable<HttpBin>();

  ngOnInit(): void {
    this.account = this.luigiContextService.contextObservable().pipe(
      tap(()=> uxManager().showLoadingIndicator()),
      first(),
      mergeMap((context) => this.accountService.subscribeBin("test")),
      tap(() => uxManager().hideLoadingIndicator()),
    )
  }

  openDeleteAccountDialog(name: string): void {
    uxManager().showConfirmationModal({
      header: 'Confirm Delete',
      body:'You are deleting your HttpBin, do you want to proceed?',
    }).then(()=>{
      uxManager().showLoadingIndicator();
      this.deleteAccount(name)
    });
  }

  deleteAccount(accountName: string): void {
    this.accountService.deleteBin(accountName)
    .pipe(
      tap(( apolloResponse: MutationResult<DeleteHttpBinResponse> )=> {
        if(apolloResponse.data?.core_openmfp_io.deleteHttpBin === true){
          linkManager().navigate(`/home/accounts`);
        }
      }),
    ).subscribe({
      error: (err: any) => {
        if(Object(err).hasOwnProperty('name') && err.name == "ApolloError"){
          uxManager().showAlert({type: 'error', text: (err as ApolloError).message, closeAfter: 5000 })
        } else {
          uxManager().showAlert({type: 'error', text: "An unexpected error occurred", closeAfter: 5000 })
        }
    }});
  }

  async navigateToAccounts($event: MouseEvent) {
    $event.stopPropagation();
    linkManager().navigate(`/home/accounts/${(await this.luigiContextService.getContextAsync()).entityContext.account?.id}/httpbin`);
  }

}
