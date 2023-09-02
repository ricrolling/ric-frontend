import * as supportedChains from 'wagmi/chains';

export type SupportedChainsKey = keyof typeof supportedChains;
export const config: {
  [K in SupportedChainsKey]?: {
    RIC_CONTRACT_ADDRESS: `0x${string}`;
  };
} = {
  foundry: {
    RIC_CONTRACT_ADDRESS: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  },
};
