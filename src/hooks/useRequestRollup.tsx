import { useContractWrite } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { config } from '../configs';

export const useRequestRollup = () => {
  const { writeAsync, data, error, isError, isSuccess, isLoading } = useContractWrite({
    abi: RICRegistryABI,
    functionName: 'requestRollup',
    address: config.RIC_CONTRACT_ADDRESS
  });

  return { writeAsync, data, error, isError, isSuccess, isLoading };
};
