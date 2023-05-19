import React, { useState } from "react";
import { ethers } from "ethers";
// import { contractAbi } from "./../../utils/contractABI";
import "./HomePage.css";

import { useConnect } from "wagmi";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { Web3NetworkSwitch } from "@web3modal/react";
function HomePage() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [provider, setProvider] = useState();
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const handleMint = async () => {
    try {
      const signer = provider.getSigner();
      const contractAddress = "0x8c4e845d3A1681FD5bD3F004919133a29C0acB72"; // Update with the contract address on Mumbai testnet
      const contract = new ethers.Contract(
        contractAddress,
        // contractAbi,
        signer
      );

      const transaction = await contract.safeMint(
        "0x0000000000000000000000000000000000000000", // Replace with the referrer's address
        quantity,
        { value: ethers.utils.parseEther("1").mul(quantity) } // Update with the desired amount per token
      );

      await transaction.wait();

      console.log("Minting transaction successful!");
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  return (
    // <div>
    //   {connectors.map((connector) => (
    //     <button
    //       disabled={!connector.ready}
    //       key={connector.id}
    //       onClick={() => connect({ connector })}
    //     >
    //       {connector.name}
    //       {!connector.ready && " (unsupported)"}
    //       {isLoading &&
    //         connector.id === pendingConnector?.id &&
    //         " (connecting)"}
    //     </button>
    //   ))}

    //   {error && <div>{error.message}</div>}
    // </div>
    <div className="container">
      <div className="top-right-buttons">
        <Web3Button />
        <Web3NetworkSwitch />
      </div>
      <div className="centered-content">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          placeholder="No of Tokens to mint"
        />
        <button onClick={handleMint}>Mint</button>
      </div>
    </div>
  );
}

export default HomePage;
