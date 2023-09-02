import { RollupInfo } from '../types';
import { StatusPill } from './StatusPill';

export const RollupTable = ({ data }: { data: Array<RollupInfo> }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Headers */}
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>ChainId</th>
            <th>Provider</th>
            <th></th>
          </tr>
        </thead>
        {/* Body of the rollups */}
        <tbody>
          {/* row 1 */}
          {data.map((d) => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <StatusPill status={d.status} />
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{d.name}</div>
                  </div>
                </div>
              </td>
              <td>{d.chainID}</td>
              <td>{d.provider}</td>
              <th>
                <button className="btn btn-outline btn-sm">Details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
