import HomePage from "./components/HomePage/HomePage";

import { Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, hardhat, avalancheFuji } from "wagmi/chains";
import Minting from "./components/Minting/Minting";
import Refer from "./components/Refer/Refer";
import Contract from "./components/Contract/Contract";

const chains = [polygon, polygonMumbai, hardhat, avalancheFuji];
const projectId = "a29cf4b5746636c7837c991a368ccf18";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {/* <HomePage /> */}
        {/* <Minting /> */}
        <Refer />
        {/* <Contract /> */}
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
