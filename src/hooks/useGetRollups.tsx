import { useAccount, useContractRead, useContractReads } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { useGetConfigByNetwork } from './useGetConfigByNetwork';
import { RollupInfo } from '../types';
import { Abi } from 'viem';

export const useGetRollups = () => {
  const curConfig = useGetConfigByNetwork();
  const { address } = useAccount();

  const ricContract = {
    abi: RICRegistryABI as Abi,
    address: curConfig?.RIC_CONTRACT_ADDRESS,
  };

  const {
    data: chainIDArr,
    error: chainIDError,
    refetch: refetchChainIds,
  } = useContractRead({
    ...ricContract,
    args: [address],
    functionName: 'getUserChainIDs',
  });

  const {
    data,
    refetch: refetchStatus,
    ...restObj
  } = useContractReads({
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
      refetchChainIds().then(refetchStatus);
    },
  };
};
