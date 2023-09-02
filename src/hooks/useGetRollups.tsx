import { useAccount, useContractRead, useContractReads } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { config } from '../configs';
import { RollupInfo } from '../types';
import { Abi } from 'viem';

const ricContract = {
  abi: RICRegistryABI as Abi,
  address: config.RIC_CONTRACT_ADDRESS,
};

export const useGetRollups = () => {
  const { address } = useAccount();
  const { data: chainIDArr, error: chainIDError, refetch: refetchChainIds } = useContractRead({
    ...ricContract,
    args: [address],
    functionName: 'getUserChainIDs',
  });

  const { data, refetch: refetchStatus, ...restObj } = useContractReads({
    contracts:
      chainIDArr && !chainIDError
        ? (chainIDArr as number[]).map((chainId) => ({
            ...ricContract,
            functionName: 'getRollupStatus',
            args: [chainId],
          }))
        : [],
  });

  return {
    ...restObj,
    data: data as Array<
      | {
          error: Error;
          result?: undefined;
          status: 'failure';
        }
      | {
          error?: undefined;
          result: RollupInfo;
          status: 'success';
        }
    >,
    refetch: () => {
      refetchChainIds().then(refetchStatus)
    }
  };
};
