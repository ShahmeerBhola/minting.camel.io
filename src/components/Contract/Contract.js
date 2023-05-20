import React, { useEffect, useState } from "react";
import Minting from "../Minting/Minting";
import "./Contract.css";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";
import { useDebounce } from "use-debounce";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

function Contract() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [minting, setMinting] = useState({
    MATIC: true,
    USD: false,
  });
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };
  const changeHandler = (e) => {
    if (e.target.name === "MATIC") {
      setMinting((prev) => ({ ...prev, MATIC: true, USD: false }));
    } else {
      setMinting((prev) => ({ ...prev, MATIC: false, USD: true }));
    }
  };
  const debouncedQuantity = useDebounce(count);

  // Contract Read
  const contractRead = useContractRead({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: [
      // ABI for the contract function
      {
        inputs: [],
        name: "latestPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "latestPrice",
  });

  // Contract Write
  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_CONTRACT_ADDRESS,
    abi: [
      // ABI for the contract function
      {
        inputs: [
          {
            internalType: "address payable",
            name: "_referrer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_quantity",
            type: "uint256",
          },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "safeMint",
    args: [
      // Arguments for the function call
      "0x0000000000000000000000000000000000000000", // Referrer address
      parseInt(debouncedQuantity), // Quantity of tokens (parsed from debounced value)
    ],
    value: "7.3",
    // ethers.utils.parseEther((100 / (parseInt(contractRead.data) / 10)).toString()).toString(), // Value in wei (calculated based on latestPrice)

    enabled: Boolean(debouncedQuantity),
  });
  const { data, write } = useContractWrite(config);

  // Wait for Transaction
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (address === undefined) {
      navigate("/");
    }
  }, [address]);
  return (
    <Minting>
      <div className="radio-section">
        <div className="radio-in">
          <input
            name="MATIC"
            className="radio"
            type="radio"
            onChange={changeHandler}
            checked={minting?.MATIC}
          />
          <span>MATIC</span>
        </div>
        <div className="radio-in">
          <input
            name="USD"
            className="radio"
            type="radio"
            onChange={changeHandler}
            checked={minting?.USD}
          />
          <span>USD</span>
        </div>
      </div>
      <p className="browser-extension">
        Please use Chrome/Firefox with MetaMask.
      </p>
      <span className="minting-total ">3.000 ETH + Gas</span>
      <div className="contract-calculate">
        <button
          className="contract-btn"
          onClick={decrement}
          disabled={count < 2}
        >
          <p>-</p>
        </button>
        <span className="contract-value">{count}</span>
        <button className="contract-btn">
          <p className="increment" onClick={increment}>
            +
          </p>
        </button>
      </div>
      <button
        className="contract-connect"
        onClick={() => write?.()}
        disabled={!write || isLoading}
      >
        <span>mint</span>
      </button>
      <div className="contract-bottom">
        <p className="browser-extension">Total Minted 001/500</p>
        <button className="contract-text">
          <span>view contract</span>
        </button>
      </div>
    </Minting>
  );
}

export default Contract;
