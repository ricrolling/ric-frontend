import { useAccount, useContractRead, useContractReads } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { useGetConfigByNetwork } from './useGetConfigByNetwork';
import { RollupInfo, RollupInfoWithPortalAddress } from '../types';
import { Abi } from 'viem';
import { mapRollupStatusNumberToStringEnum } from '../utils';

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

  const { data: rollupInfoDataArr, refetch: refetchStatus } = useContractReads({
    contracts:
      chainIDArr && !chainIDError
        ? (chainIDArr as number[]).map((chainId) => ({
            ...ricContract,
            functionName: 'getRollupStatus',
            args: [chainId],
          }))
        : [],
  });

  const { data: l1AddressesArr, refetch: refetchL1Address } = useContractReads({
    contracts:
      chainIDArr && !chainIDError
        ? (chainIDArr as number[]).map((chainId) => ({
            ...ricContract,
            functionName: 'activatedRollupsL1Addresses',
            args: [chainId],
          }))
        : [],
  });

  const processedData = rollupInfoDataArr
    ?.map((data, idx) => {
      if (data.result && l1AddressesArr && l1AddressesArr[idx].result) {
        let portalAddress = '';
        if ((l1AddressesArr[idx].result as string).length >= 372) {
          portalAddress = (l1AddressesArr[idx].result as string).slice(
            352,
            372,
          );
        }
        return {
          ...(data.result as RollupInfo),
          status: mapRollupStatusNumberToStringEnum(
            (data.result as RollupInfo).status as unknown as number,
          ),
          portalAddress,
        };
      }
      return undefined;
    })
    .filter((d) => d !== undefined) as Array<RollupInfoWithPortalAddress>;

  return {
    data: processedData,
    refetch: () => {
      refetchChainIds().then(() => {
        refetchStatus();
        refetchL1Address();
      });
    },
  };
};
