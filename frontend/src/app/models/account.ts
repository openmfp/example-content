export interface AccountsResponse {
  coreOpenmfpIo: coreOpenmfpIo
}

export interface coreOpenmfpIo {
  accounts: Account[]
}

export interface Account {
  metadata: ObjectMetadata;
}

export interface ObjectMetadata {
  name: String
}