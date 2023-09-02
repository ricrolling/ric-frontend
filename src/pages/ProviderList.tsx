import { ProviderTable } from '../components/ProviderTable';
import { useGetActiveProviders } from '../hooks/useGetActiveProviders';

export const ProviderList = () => {
  // Do some data fetching here
  const {
    data: activeProviders,
    // isError: isGetRollupError,
    // isLoading: isGetRollupLoading,
  } = useGetActiveProviders();

  return (
    <div className="flex flex-col mx-auto mt-12">
      <div className="card shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Supported Rollup Providers</h2>
          <ProviderTable data={activeProviders} />
        </div>
      </div>
    </div>
  );
};
