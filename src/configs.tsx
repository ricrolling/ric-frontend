import * as supportedChains from 'wagmi/chains';

export type SupportedChainsKey = keyof typeof supportedChains;
export const config: {
  [K in SupportedChainsKey]?: {
    RIC_CONTRACT_ADDRESS: `0x${string}`;
  };
} = {
  foundry: {
    RIC_CONTRACT_ADDRESS: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
  },
};
