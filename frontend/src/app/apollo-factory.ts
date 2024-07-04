import { Injectable } from "@angular/core";
import { ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { apiurl } from "./graphql.config";
import { PortalLuigiContextService } from "./services/luigi-context.service";
import { HttpLink } from 'apollo-angular/http';
import { first } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApolloFactory {
  constructor(private luigiContextService:PortalLuigiContextService){}


  createApollo(httpLink: HttpLink) {
    const basic = setContext((operation, context) => ({
      headers: {
        Accept: 'charset=utf-8',
      },
    }));
   
    const auth = setContext((operation, context) => {
      let ctx = this.luigiContextService.getContext()
      if (ctx.token === null) {
        return {};
      } else {
        return {
          headers: {
            Authorization: `Bearer ${ctx.token}`,
          },
        };
      }
    });
   
    const link = ApolloLink.from([basic, auth, httpLink.create({ uri: apiurl })]);
    const cache = new InMemoryCache();
   
    return {
      link,
      cache,
    };
  }
}