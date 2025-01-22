import { FrameContext } from './frame-context';

export interface PortalRootContext extends Record<string, any> {
  token: string;
  userid: string;
  portalContext: PortalContext;
  tenantid: string;
  frameContext: FrameContext;
  serviceProviderConfig: Record<string, string>;
  projectId?: string;
  teamId?: string;
  componentId?: string;
  profileUserId?: string;
  entityContext: {
    account?: {
      id?: string;
    };
    project?: {
      policies: string[];
      automaticdNamespace?: string;
    };
    team?: {
      policies: string[];
      automaticdNamespace?: string;
    };
    component?: {
      extensions: {
        dora?: {
          identifier: string;
        };
        piper?: {
          enabled: boolean;
        };
      };
    };
  };

  goBackContext?: any;
  parentNavigationContexts: string[];

  extClassName?: string;
}

export interface PortalContext extends Record<string, string> {
  crdGatewayApiUrl: string;
}
