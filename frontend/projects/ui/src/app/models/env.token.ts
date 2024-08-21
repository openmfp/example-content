import { InjectionToken } from '@angular/core';
import { PortalContext } from './portal-context';

export const ENV = new InjectionToken<Environment>('ENV');

export interface Environment extends Record<string, any> {
  luigiContextOverwrite?: Partial<PortalContext>;
}