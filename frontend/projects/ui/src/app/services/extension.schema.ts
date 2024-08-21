

export interface Account {
  id: string;
  name: string;
  displayName: string;
  type: AccountType;
  subType?: string;
  ref: string;
  link?: string;
}

export interface AccountConnection {
  description: string;
  displayName: string;
  name: string;
  image: {
    url: string;
  };
  type: AccountConnectionType;
  subType?: string;
}

export interface AccountConnectionType {
  context: string;
  name: string;
  apiResourceConfig: APIResourceConfig;
}

export interface APIResourceConfig {
  wizardConfig: WizardConfig;
  displayConfig: APIResourceDisplayConfig;
}

export interface APIResourceDisplayConfig {
  apiServerConfig: APIServerConfig;
  resourceConfig: ResourceConfig;
  tableConfig: TableConfig;
}

export interface ResourceConfig {
  groupVersion: string;
  kind: string;
}

export interface APIServerConfig {
  host: string;
  namespaceRetrievalStrategy: string;
}

export interface TableConfig {
  columns: ColumnConfig[];
  actions?: ActionsConfig;
}

export interface ActionsConfig {
  additionalActions: ActionConfig[];
}

export interface ActionConfig {
  displayName: string;
  condition: string;
  execute: ExecutionConfig;
}

export interface ExecutionConfig {
  type: string;
  payload: string;
}

export interface ColumnConfig {
  label: string;
  name: string;
  dataPath: string;
  link?: LinkConfig;
  text?: TextConfig;
  status?: StatusConfig;
  tags?: TagConfig;
}

export interface TagConfig {
  sort?: string;
}

export interface StatusConfig {
  mapping: StatusMapping;
}

export interface StatusMapping {
  critical: string;
  positive: string;
  negative: string;
  informative: string;
  default: string;
}

export interface TextConfig {
  style?: string;
}

export interface LinkConfig {
  target: string;
  urlPath?: string;
  url?: string;
}

export interface AccountType {
  id: string;
  defaultAccount?: Account;
  displayName: string;
  description?: string;
  image?: string;
  type: {
    Name: string;
  };
}

export interface Contact {
  displayName: string;
  email?: string;
  role?: string[];
  contactLink?: string;
}

export type ColorCategory =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export type Label = {
  title: string;
  color: ColorCategory;
};

export interface ExtensionClass {
  name: string;
  displayName: string;
  description?: string;
  image?: string; // data:image/x;base64,
  category?: string;
  cdmUrl?: string;
  scope: Scope;
  configurationMetadata: string;
  instances: ExtensionInstance[];
  isChangingInstallations: boolean;
  icon?: Icon;
  wizardConfig?: WizardConfig;
  documentation?: Documentation;
  creationTimestamp?: string;
  accountConnections?: AccountConnection[];
  contacts?: Contact[];
  labels?: Label[];
  links?: Link[];
  mainLink?: Link;
  preferredSupportChannels?: Link[];
  provider?: string;
  network?: string;
  verification?: any;
  serviceLevel?: ServiceLevel;
  template?: TemplateSpec;
}

export interface TemplateSpec {
  name: string;
  version: string;
}

export interface Link {
  displayName?: string;
  URL?: string;
}

export enum ServiceLevel {
  VeryHigh = 'veryHigh24x7',
  High = 'high24x5',
  MediumOne = 'mediumOne16x5',
  MediumTwo = 'mediumTwo12x5',
  Low = 'low8x5',
}

export interface WizardConfig {
  name: string;
  configData: string;
  wizardDefinition: string;
}

export interface Documentation {
  url?: string;
}

export interface Icon {
  light: Image;
  dark: Image;
}

export interface Image {
  url?: string;
  data?: string;
}

export interface Scope {
  type: ScopeType;
}

export enum ScopeType {
  PROJECT = 'PROJECT',
  TEAM = 'TEAM',
  COMPONENT = 'COMPONENT',
  TENANT = 'TENANT',
  GLOBAL = 'GLOBAL',
}

export interface ExtensionInstance {
  id: string;
  name: string;
  extensionClass: ExtensionClass;
  configurationMetadata?: any;
  installationData?: { [key: string]: string };
  isMandatoryExtension?: boolean;
  creationTimestamp?: Date;
  status: ExtensionStatus;
  scope: Scope;
  extensionStatus?: Record<string, ExtensionInstanceStatusValue>;
}

export interface ExtensionInstanceStatusValue {
  label: string;
}

export enum ExtensionStatus {
  READY = 'READY',
  IN_DELETION = 'IN_DELETION',
}

export interface InstallExtensionsInput {
  extensionClass: ExtensionClassInput;
  displayName: string;
  installationData?: Record<string, any>;
}

export interface UpdateExtensionInput {
  extensionClass: ExtensionClassInput;
  instanceId: string;
  installationData: Record<string, any>;
}

export interface ExtensionClassInput {
  id: string;
  scope: ScopeType;
}

export interface ExtensionClassFilter {
  installableIn?: string[];
  excludeHiddenExtensions?: boolean;
  excludeHiddenInGlobalCatalogExtensions?: boolean;
}
