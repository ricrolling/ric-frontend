export enum RollupStatus {
  REQUESTED = 'REQUESTED',
  QUEUED = 'QUEUED',
  ACTIVATED = 'ACTIVATED',
}

export type RollupInfo = {
  name: string;
  status: RollupStatus;
  provider: string;
  queuedTimestamp: number;
  chainID: number;
  config: string;
};
