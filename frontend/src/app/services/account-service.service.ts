import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, mergeMap, Observable } from 'rxjs';
import { Account, AccountsResponse } from '../models/account';
import { Apollo, gql } from 'apollo-angular';
import { PortalLuigiContextService } from './luigi-context.service';

export const POLLING_INTERVAL = 5000;

const accountsQuery = gql `
query {
  coreOpenmfpIo {
    accounts(namespace: "openmfp-root") {
      metadata {
        name
      }
    }
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private luigiContextService: PortalLuigiContextService,
    private apollo : Apollo
  ) { }

  public getAccounts(): Observable<Account[]> {
    return this.luigiContextService.contextObservable().pipe(
      first(),
      mergeMap(context => 
        this.apollo.watchQuery<AccountsResponse>({
          query: accountsQuery,
          pollInterval: POLLING_INTERVAL,
          fetchPolicy: 'no-cache',
        }).valueChanges.pipe(
          map((apolloResponse) => {
            console.log(apolloResponse);
            return apolloResponse.data.coreOpenmfpIo.accounts
          }
          ),
          distinctUntilChanged()
        )
      )
    )
  }

}
