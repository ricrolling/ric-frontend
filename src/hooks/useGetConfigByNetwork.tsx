import { useNetwork } from 'wagmi';
import * as supportedChains from 'wagmi/chains';
import { config } from '../configs';

export const useGetConfigByNetwork = () => {
  const { chain } = useNetwork();
  if (chain?.id === supportedChains.foundry.id) {
    return config.foundry;
  }

  if (chain?.id === supportedChains.lineaTestnet.id) {
    return config.lineaTestnet;
  }
};
