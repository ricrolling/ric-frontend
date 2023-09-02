import { useContractWrite } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { useGetConfigByNetwork } from './useGetConfigByNetwork';

export const useRequestRollup = () => {
  const curConfig = useGetConfigByNetwork();

  const { writeAsync, data, error, isError, isSuccess, isLoading } =
    useContractWrite({
      abi: RICRegistryABI,
      functionName: 'requestRollup',
      address: curConfig?.RIC_CONTRACT_ADDRESS,
    });

  return { writeAsync, data, error, isError, isSuccess, isLoading };
};
