import { RollupInfo } from '../types';

const RollupDetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
      </div>
      <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
        {value}
      </div>
    </div>
  );
};

export const RollupDetailModal = ({ data }: { data?: RollupInfo }) => {
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
            <RollupDetailRow label="Status" value={data.status} />
            <RollupDetailRow label="Provider" value={data.provider} />
            <RollupDetailRow label="ChainID" value={data.chainID} />
            <RollupDetailRow
              label="QueuedTimestamp"
              value={data.queuedTimestamp}
            />

            {/* Code */}
            <div className="flex flex-col pt-4">
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Additional Configs
                </p>
              </div>
              <p className="break-words text-left items-center text-base text-gray-900 dark:text-gray-300">
                {data.config || "-"}
              </p>
            </div>
          </li>
        </ul>
      </form>
    </dialog>
  );
};
