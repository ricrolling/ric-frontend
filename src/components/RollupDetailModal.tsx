import { RollupInfoWithPortalAddress } from '../types';
import { StatusPill } from './StatusPill';

const RollupDetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-col pt-4">
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
      </div>
      <p className="break-words text-left items-center text-base text-gray-900 dark:text-gray-300">
        {value.toString()}
      </p>
    </div>
  );
};

export const RollupDetailModal = ({
  data,
}: {
  data?: RollupInfoWithPortalAddress;
}) => {
  if (!data) {
    return <dialog id="rollup_detail" className="modal"></dialog>;
  }
  return (
    <dialog id="rollup_detail" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">{data.name}</h3>

        <ul
          role="list"
          className="p-8 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex flex-col pt-4">
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Status
                </p>
              </div>
              <p className="break-words text-left items-center text-base text-gray-900 dark:text-gray-300">
                <StatusPill status={data.status} />
              </p>
            </div>
            <RollupDetailRow label="ChainID" value={data.chainID} />
            <RollupDetailRow label="Provider" value={data.provider} />
            <RollupDetailRow
              label="Portal Address"
              value={data.portalAddress || '-'}
            />
            <RollupDetailRow
              label="Queued Timestamp"
              value={data.queuedTimestamp.toString()}
            />
            <RollupDetailRow
              label="Additional Configs"
              value={data.config || '-'}
            />
          </li>
        </ul>
      </form>
    </dialog>
  );
};
