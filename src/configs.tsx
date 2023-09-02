import supportedChains from 'wagmi/chains';

export type SupportedChainsKey = keyof typeof supportedChains;
export const config: {
  [K in SupportedChainsKey]?: {
    RIC_CONTRACT_ADDRESS: `0x${string}`;
  };
} = {
  foundry: {
    RIC_CONTRACT_ADDRESS: '0x71C95911E9a5D330f4D621842EC243EE1343292e',
  },
};
