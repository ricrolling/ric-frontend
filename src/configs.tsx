import * as supportedChains from 'wagmi/chains';

export type SupportedChainsKey = keyof typeof supportedChains;
export const config: {
  [K in SupportedChainsKey]?: {
    RIC_CONTRACT_ADDRESS: `0x${string}`;
  };
} = {
  lineaTestnet: {
    RIC_CONTRACT_ADDRESS: '0x13Ce9a6d5dd1b9301da30d031dbcB1ef653c5397',
  },
};
