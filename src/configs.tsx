import * as supportedChains from 'wagmi/chains';

export type SupportedChainsKey = keyof typeof supportedChains;
export const config: {
  [K in SupportedChainsKey]?: {
    RIC_CONTRACT_ADDRESS: `0x${string}`;
  };
} = {
  foundry: {
    RIC_CONTRACT_ADDRESS: '0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F',
  },
};
