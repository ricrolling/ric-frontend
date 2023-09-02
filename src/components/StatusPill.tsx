import { RollupStatus } from '../types';

export const StatusPill = ({ status }: { status: RollupStatus }) => {
  if (status === RollupStatus.ACTIVATED) {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        Activated
      </span>
    );
  } else if (status == RollupStatus.QUEUED) {
    return (
      <span className="inline-flex items-center bg-cyan-100 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">
        <span className="w-2 h-2 mr-1 bg-cyan-500 rounded-full"></span>
        Queued
      </span>
    );
  }
  return (
    <span className="inline-flex items-center bg-orange-100 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
      <span className="w-2 h-2 mr-1 bg-orange-500 rounded-full"></span>
      Requested
    </span>
  );
};
