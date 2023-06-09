import { Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, avalancheFuji } from "wagmi/chains";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./routes";

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
          <ToastContainer autoClose={1500} />
          <Routes />
          {/* <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/contract" element={<Contract />} />
          </Routes> */}
        </BrowserRouter>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Manrope",
          "--w3m-accent-color": "#02198b ",
        }}
      />
    </>
  );
}

export default App;
