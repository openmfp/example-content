import { InjectionToken } from '@angular/core';
import { PortalRootContext } from './portal-context';

export const ENV = new InjectionToken<Environment>('ENV');

export interface Environment extends Record<string, any> {
  luigiContextOverwrite?: Partial<PortalRootContext>;
}