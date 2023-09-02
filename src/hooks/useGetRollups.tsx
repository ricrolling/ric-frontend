import { usePublicClient } from 'wagmi';
import RICRegistryABI from '../abis/RICRegistry.json';
import { useCallback } from 'react';

export const useGetRollups = () => {
    const publicClient = usePublicClient();

    // const getRollupStatus =  useCallback((chainID) => {

    // }, [publicClient]);
};
