import { Injectable, Injector } from '@angular/core';
import {
  ILuigiContextTypes,
  LuigiContextService,
  LuigiContextServiceImpl,
} from '@luigi-project/client-support-angular';
import { Observable } from 'rxjs';
import deepmerge from 'deepmerge';
import { map } from 'rxjs/operators';
import { ENV, Environment } from '../models/env.token';
import { PortalContext } from '../models/portal-context';

export interface IContextMessage {
  contextType: ILuigiContextTypes;
  context: PortalContext;
}

@Injectable({
  providedIn: 'root',
})
export class PortalLuigiContextService extends LuigiContextService {
  private luigiContextService: LuigiContextServiceImpl;
  private readonly env: Environment;

  constructor(private injector: Injector) {
    super();
    this.luigiContextService = injector.get(LuigiContextServiceImpl);
    this.env = injector.get(ENV, {});
  }

  /**
   *
   * Can be used to set the context manually, not to be used in iframe based MFEs, the context is always set automatically.
   * This method can be used to set the context in WebComponent based MFEs from the AppComponent.
   *
   * @param context the context to be set
   */
  setContext(context: PortalContext): void {
    this.luigiContextService.addListener(ILuigiContextTypes.UPDATE, context);
  }

  getContext(): PortalContext {
    if (!this.env.luigiContextOverwrite) {
      return this.luigiContextService.getContext() as PortalContext;
    }

    return deepmerge(
      this.luigiContextService.getContext(),
      this.env.luigiContextOverwrite
    );
  }

  getContextAsync(): Promise<PortalContext> {
    if (!this.env.luigiContextOverwrite) {
      return this.luigiContextService.getContextAsync() as Promise<PortalContext>;
    }

    return this.luigiContextService
      .getContextAsync()
      .then((context) =>
        deepmerge(
          context as PortalContext,
          this.env.luigiContextOverwrite as Partial<PortalContext>
        )
      );
  }

  contextObservable(): Observable<IContextMessage> {
    if (!this.env.luigiContextOverwrite) {
      return this.luigiContextService.contextObservable() as Observable<IContextMessage>;
    }

    return this.luigiContextService.contextObservable().pipe(
      map((context) => {
        const mergedContext = deepmerge(
          context.context as PortalContext,
          this.env.luigiContextOverwrite as Partial<PortalContext>
        );
        return { contextType: context.contextType, context: mergedContext };
      })
    );
  }
}