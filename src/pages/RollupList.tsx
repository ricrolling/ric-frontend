import { RollupCreationModal } from '../components/RollupCreationModal';
import { RollupTable } from '../components/RollupTable';
import { RollupInfo, RollupStatus } from '../types';

export const RollupList = () => {
  const windowContext = window as unknown as typeof window & {
    rollup_creation: {
      showModal: () => void;
    };
  };

  // Do some data fetching here
  const rollupData: Array<RollupInfo> = [
    {
      name: 'rollup 1',
      chainID: 11312,
      config: '',
      provider: 'RicRollup Default',
      queuedTimestamp: Date.now(),
      status: RollupStatus.ACTIVATED,
    },
    {
      name: 'rollup 2',
      chainID: 11312,
      config: '{kdjfkjshdkjhjdsghgksjgfjgjhehkjgdkfgjkdfhgkdfjhgkjdfhgkjdhkjghdfkjghdfkjghdkjfhgkjdfhgkjdfhgkjdhfgkjhdfkjghdkfghfjdkhgfkdjghdfkjhgdfkjhgkjdfhgkjdfhgkjdfhkjgdhfgkjhdfjkghdfkjghkjdfhgkjdfhkj}',
      provider: 'RicRollup Default',
      queuedTimestamp: Date.now(),
      status: RollupStatus.QUEUED,
    },
    {
      name: 'rollup 3',
      chainID: 11312,
      config: '',
      provider: 'RicRollup Default',
      queuedTimestamp: Date.now(),
      status: RollupStatus.REQUESTED,
    },
  ];

  return (
    <>
      <div className="flex flex-col mx-auto mt-12">
        <div className="card shadow-xl">
          <div className="card-body">
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-md"
                onClick={() => {
                  windowContext.rollup_creation.showModal();
                }}
              >
                Create a new rollup
                {/* Plus icon */}
                <svg
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12H15"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9L12 15"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            <h2 className="card-title">Current rollups</h2>
            <RollupTable data={rollupData} />
          </div>
        </div>
      </div>
      <RollupCreationModal
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};
