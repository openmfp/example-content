export interface DeleteHttpBinResponse {
  orchestrate_cloud_sap: orchestrateCloudSapHttpbin;
}

export interface CreateHttpBinResponse {
  orchestrate_cloud_sap: coreOpenmfpIoCreateHttpBin;
}

export interface HttpBinsSubscriptionResponse {
  orchestrate_cloud_sap_httpbins: HttpBin[];
}

export interface HttpBinSubscriptionResponse {
  orchestrate_cloud_sap_httpbin: HttpBin;
}
export interface orchestrateCloudSapHttpbin {
  deleteHttpBin: Boolean;
}

export interface coreOpenmfpIoCreateHttpBin {
  createHttpBin: HttpBin;
}

export interface HttpBin {
  metadata: ObjectMetadata;
  spec: HttpBinSpec;
  status?: HttpBinStatus;
}

export interface ObjectMetadata {
  name: string;
}

export interface HttpBinSpec {
  enableHTTPS: string;
}

export interface HttpBinStatus {
  ready: boolean
  url: string
}

export interface CreateHttpBin {
  key: string;
  enableHTTPS: boolean | null;
}
