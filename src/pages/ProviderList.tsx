import { ProviderTable } from '../components/ProviderTable';
import { ProviderInfo } from '../types';

export const ProviderList = () => {
  // Do some data fetching here
  const providerData: Array<ProviderInfo> = [
    {
      name: 'RicRollup Default',
      description: 'The default rollup provider.',
    },
  ];

  return (
    <div className="flex flex-col mx-auto mt-12">
      <div className="card shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Supported Rollup Providers</h2>
          <ProviderTable data={providerData} />
        </div>
      </div>
    </div>
  );
};
