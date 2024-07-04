export interface AccountsResponse {
  coreOpenmfpIo: coreOpenmfpIo
}

export interface coreOpenmfpIo {
  accounts: Account[]
}

export interface Account {
  metadata: ObjectMetadata;
  spec: AccountSpec
}

export interface ObjectMetadata {
  name: String
}
export interface AccountSpec {
  displayName: String
  // type: String
}