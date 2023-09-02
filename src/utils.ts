import { RollupStatus } from './types';

export const mapRollupStatusNumberToStringEnum = (
  statusNo: number,
): RollupStatus => {
  switch (statusNo) {
    case 0:
      return RollupStatus.REQUESTED;
    case 1:
      return RollupStatus.QUEUED;
    case 2:
      return RollupStatus.REQUESTED;
    default:
      throw new Error("Invalid status")
  }
};
