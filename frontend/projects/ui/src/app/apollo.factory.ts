import { Injectable } from '@angular/core';
import {
  ApolloLink,
  FetchResult,
  InMemoryCache,
  Operation,
  split,
  Observable as ApolloObservable,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { PortalLuigiContextService } from './services/luigi-context.service';
import { HttpLink } from 'apollo-angular/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { Client, ClientOptions, createClient } from 'graphql-sse';
import { ExecutionResult, print } from 'graphql';

class SSELink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public override request(operation: Operation): ApolloObservable<FetchResult> {
    return new ApolloObservable((sink) => {
      return this.client.subscribe(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        }
      );
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApolloFactory {
  constructor(private luigiContextService: PortalLuigiContextService) {}

  createApollo(httpLink: HttpLink) {
    const contextLink = setContext(async () => {
      let ctx = await this.luigiContextService.getContextAsync();
      let apiUrl = ctx.portalContext.crdGatewayApiUrl;
      if (ctx.entityContext.account?.id) {
        apiUrl = apiUrl.replace('/graphql', `:${ctx.entityContext.account.id}/graphql`);
      }
      return {
        uri: apiUrl,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          Accept: 'charset=utf-8',
        },
      };
    });

    const splitClient = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      new SSELink({
        url: () => {
          return this.luigiContextService
            .getContextAsync()
            .then((ctx) => {
              let apiUrl = ctx.portalContext.crdGatewayApiUrl;
              if (ctx.entityContext.account?.id) {
                apiUrl = apiUrl.replace('/graphql', `:${ctx.entityContext.account.id}/graphql`);
              }

              return apiUrl
            });
        },
        headers: () => {
          return this.luigiContextService.getContextAsync().then((ctx) => ({
            Authorization: `Bearer ${ctx.token}`,
          }));
        },
      }),
      httpLink.create({})
    );

    const link = ApolloLink.from([contextLink, splitClient]);
    const cache = new InMemoryCache();

    return {
      link,
      cache,
    };
  }
}
