import HomePage from "./components/HomePage/HomePage";

import { Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, avalancheFuji } from "wagmi/chains";
import Refer from "./components/Refer/Refer";
import Contract from "./components/Contract/Contract";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const chains = [polygon, avalancheFuji];
const projectId = process.env.REACT_APP_PROJECT_ID;

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Refer />} />
            <Route path="/contract" element={<Contract />} />
          </Routes>
        </BrowserRouter>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Manrope",
          "--w3m-accent-color": "#F5841F",
        }}
      />
    </>
  );
}

export default App;
