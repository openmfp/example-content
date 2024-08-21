import { Injectable } from '@angular/core';
import { PortalLuigiContextService } from './services/luigi-context.service';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

@Injectable({
  providedIn: 'root',
})
export class ApolloFactory {
  constructor(private luigiContextService: PortalLuigiContextService) {}

  createApollo(httpLink: HttpLink) {
    const contextLink = setContext(async () => {
      const ctx = await this.luigiContextService.getContextAsync();
      const apiUrl = ctx.portalContext?.crdGatewayApiUrl ?? '';

      return {
        uri: apiUrl,
        headers: {
          Authorization: `Bearer ${ctx.token}`,
        },
      };
    });

    return {
      link: ApolloLink.from([contextLink, httpLink.create({})]),
      cache: new InMemoryCache(),
    };
  }
}
