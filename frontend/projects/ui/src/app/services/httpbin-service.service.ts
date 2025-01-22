import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, mergeMap, Observable } from 'rxjs';
import {
  HttpBin,
  HttpBinsSubscriptionResponse,
  HttpBinSubscriptionResponse,
  CreateHttpBin,
  CreateHttpBinResponse,
  DeleteHttpBinResponse
} from '../models/httpbins';
import { PortalLuigiContextService } from './luigi-context.service';
import { gql } from "@apollo/client/core"
import { Apollo, MutationResult } from 'apollo-angular';

const accountsSubscription = gql `
  subscription {
    orchestrate_cloud_sap_httpbins {
      metadata {
        name
      }
      spec {
        foo
      }
    }
  }
`
const accountSubscription = gql `
  subscription ($name: String!) {
    orchestrate_cloud_sap_httpbin(namespace: "default", name: $name) {
      metadata {
        name
      }
      spec {
        foo
      }
    }
  }
`

const createAccountMutation = gql `
  mutation($name: String!, $foo: String!) {
    orchestrate_cloud_sap {
     createHttpBin(namespace:"default", metadata: { name: $name}, spec: {
       foo: $foo,
     }) {
       metadata { name }
     }
   }
 }
`
const deleteAccountMutation = gql `
  mutation($name: String!) {
    core_openmfp_io {
      deleteAccount(name: $name, namespace:"demo-root")
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class HttpBinService {
  constructor(
    private luigiContextService: PortalLuigiContextService,
    private apollo : Apollo
  ) { }

  public subscribeBins(): Observable<HttpBin[]> {
    return this.apollo.subscribe<HttpBinsSubscriptionResponse>({
        query: accountsSubscription,
      fetchPolicy: 'no-cache',
      }).pipe(
      map((apolloResponse) =>
        apolloResponse.data?.orchestrate_cloud_sap_httpbins || []
      ),
      distinctUntilChanged()
    )
  }

  public subscribeBin(name: string): Observable<HttpBin> {
    return this.apollo.subscribe<HttpBinSubscriptionResponse>({
      query: accountSubscription,
      fetchPolicy: 'no-cache',
      variables: {
        name: name
      }
    }).pipe(
      map((apolloResponse) =>
          apolloResponse.data?.orchestrate_cloud_sap_httpbin!
      ),
      distinctUntilChanged()
    )
  }

  public createBin(formData: CreateHttpBin): Observable<MutationResult<CreateHttpBinResponse>> {
    return this.luigiContextService.contextObservable().pipe(
      first(),
      mergeMap(() =>
        this.apollo.mutate<CreateHttpBinResponse>({
          mutation: createAccountMutation,
          fetchPolicy: 'no-cache',
          variables: {
            name: formData.key,
            foo: formData.foo,
          }
        })
      )
    )
  }

  public deleteBin(name: string): Observable<MutationResult<DeleteHttpBinResponse>> {
    return this.luigiContextService.contextObservable().pipe(
      first(),
      mergeMap(() =>
        this.apollo.mutate<DeleteHttpBinResponse>({
          mutation: deleteAccountMutation,
          fetchPolicy: 'no-cache',
          variables: {
            name,
          }
        })
      )
    )
  }
}
