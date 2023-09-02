import { useNetwork } from 'wagmi';
import supportedChains from 'wagmi/chains';
import { config } from '../configs';

export const useGetConfigByNetwork = () => {
  const { chain } = useNetwork();
  if (chain?.id === supportedChains.foundry.id) {
    return config.foundry;
  }
};
