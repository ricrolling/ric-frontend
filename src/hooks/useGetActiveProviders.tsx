import { useContractRead, useContractReads } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { useGetConfigByNetwork } from './useGetConfigByNetwork';
import { ProviderInfo } from '../types';
import { Abi } from 'viem';

export const useGetActiveProviders = () => {
  const curConfig = useGetConfigByNetwork();

  const ricContract = {
    abi: RICRegistryABI as Abi,
    address: curConfig?.RIC_CONTRACT_ADDRESS,
  };

  // This shouldn't error out
  const {
    data: providerStakeAmount,
    error: providerStakeAmountErr,
    refetch: refetchProviderStakeAmount,
  } = useContractRead({
    ...ricContract,
    functionName: 'providerStakeAmount',
  });

  const {
    data: providersArr,
    error: providersErr,
    refetch: refetchProviders,
  } = useContractRead({
    ...ricContract,
    functionName: 'getProviders',
  });

  const {
    data,
    refetch: refetchStatus,
    ...restObj
  } = useContractReads({
    contracts:
      providerStakeAmount &&
      !providerStakeAmountErr &&
      providersArr &&
      !providersErr
        ? (providersArr as string[]).map((providerAddr) => ({
            ...ricContract,
            functionName: 'providerStake',
            args: [providerAddr],
          }))
        : [],
  });

  return {
    ...restObj,
    data: (data
      ? data.map((d, idx) => {
          const providerStake = d.result as bigint; // bignumber
          if (providerStake) {
            if (providerStake === providerStakeAmount)
              return {
                name: (providersArr as string[])[idx],
                description: 'One of our active provider!',
              };
          }
          return undefined;
        })
      : []
    ).filter((d) => d !== undefined) as Array<ProviderInfo>,
    refetch: () => {
      (() =>
        Promise.all([refetchProviders(), refetchProviderStakeAmount()]))().then(
        () => refetchStatus(),
      );
    },
  };
};
