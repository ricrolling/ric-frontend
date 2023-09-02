import { useState } from 'react';
import { RollupInfoWithPortalAddress } from '../types';
import { StatusPill } from './StatusPill';
import { RollupDetailModal } from './RollupDetailModal';

export const RollupTable = ({ data }: { data: Array<RollupInfoWithPortalAddress> }) => {
  const [currentModalDisplayData, setCurrentModalDisplayData] =
    useState<RollupInfoWithPortalAddress>();
  const windowContext = window as unknown as typeof window & {
    rollup_detail: {
      showModal: () => void;
    };
  };

  const openModalWithData = (idx: number) => () => {
    setCurrentModalDisplayData(data[idx]);
    windowContext.rollup_detail.showModal();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Headers */}
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>ChainId</th>
              <th>Provider</th>
              <th>PortalAddress</th>
              <th></th>
            </tr>
          </thead>
          {/* Body of the rollups */}
          <tbody>
            {/* row 1 */}
            {data.map((d, idx) => (
              <tr key={idx}>
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
                <td>{d.chainID.toString()}</td>
                <td>{d.provider}</td>
                <td>{d.portalAddress ? d.portalAddress : "-"}</td>
                <th>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={openModalWithData(idx)}
                  >
                    Details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RollupDetailModal data={currentModalDisplayData} />
    </>
  );
};
