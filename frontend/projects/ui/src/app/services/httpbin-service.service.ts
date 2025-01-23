import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, mergeMap, Observable } from 'rxjs';
import {
  HttpBin,
  HttpBinsSubscriptionResponse,
  HttpBinSubscriptionResponse,
  CreateHttpBin,
  CreateHttpBinResponse,
  DeleteHttpBinResponse,
} from '../models/httpbins';
import { PortalLuigiContextService } from './luigi-context.service';
import { gql } from '@apollo/client/core';
import { Apollo, MutationResult } from 'apollo-angular';

const httpbinsSubscription = gql`
  subscription {
    orchestrate_cloud_sap_httpbins {
      metadata {
        name
      }
      spec {
        enableHttps
      }
    }
  }
`;
const httpbinSubscription = gql`
  subscription ($name: String!) {
    orchestrate_cloud_sap_httpbin(namespace: "default", name: $name) {
      metadata {
        name
      }
      spec {
        enableHttps
      }
    }
  }
`;

const createHttpBinMutation = gql`
  mutation ($name: String!, $enableHttps: Boolean!) {
    orchestrate_cloud_sap {
      createHttpBin(
        namespace: "default"
        object: { metadata: { name: $name }, spec: { enableHttps: $enableHttps } }
      ) {
        metadata {
          name
        }
      }
    }
  }
`;
const deleteAccountMutation = gql`
  mutation ($name: String!) {
    core_openmfp_io {
      deleteAccount(name: $name, namespace: "demo-root")
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class HttpBinService {
  constructor(
    private luigiContextService: PortalLuigiContextService,
    private apollo: Apollo
  ) {}

  public subscribeBins(): Observable<HttpBin[]> {
    return this.apollo
      .subscribe<HttpBinsSubscriptionResponse>({
        query: httpbinsSubscription,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(
          (apolloResponse) =>
            apolloResponse.data?.orchestrate_cloud_sap_httpbins || []
        ),
        distinctUntilChanged()
      );
  }

  public subscribeBin(name: string): Observable<HttpBin> {
    return this.apollo
      .subscribe<HttpBinSubscriptionResponse>({
        query: httpbinSubscription,
        fetchPolicy: 'no-cache',
        variables: {
          name: name,
        },
      })
      .pipe(
        map(
          (apolloResponse) =>
            apolloResponse.data?.orchestrate_cloud_sap_httpbin!
        ),
        distinctUntilChanged()
      );
  }

  public createBin(
    formData: CreateHttpBin
  ): Observable<MutationResult<CreateHttpBinResponse>> {
    return this.luigiContextService.contextObservable().pipe(
      first(),
      mergeMap(() => {
        this.apollo
          .mutate({
            mutation: gql`
              mutation {
                core {
                  createNamespace(object: { metadata: { name: "default" } }) {
                    metadata {
                      name
                    }
                  }
                }
              }
            `,
          })
          .subscribe((res) => console.log(res));

        return this.apollo.mutate<CreateHttpBinResponse>({
          mutation: createHttpBinMutation,
          fetchPolicy: 'no-cache',
          variables: {
            name: formData.key,
            enableHttps: formData.enableHTTPS,
          },
        });
      })
    );
  }

  public deleteBin(
    name: string
  ): Observable<MutationResult<DeleteHttpBinResponse>> {
    return this.luigiContextService.contextObservable().pipe(
      first(),
      mergeMap(() =>
        this.apollo.mutate<DeleteHttpBinResponse>({
          mutation: deleteAccountMutation,
          fetchPolicy: 'no-cache',
          variables: {
            name,
          },
        })
      )
    );
  }
}
