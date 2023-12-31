import { ProviderInfo } from '../types';

export const ProviderTable = ({ data }: { data: Array<ProviderInfo> }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Headers */}
        <thead>
          <tr>
            <th>Provider</th>
            <th>Description</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{d.name}</div>
                  </div>
                </div>
              </td>
              <td>{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
