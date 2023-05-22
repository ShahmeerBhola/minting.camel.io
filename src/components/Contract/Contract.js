import React, { useEffect, useState } from "react";
import Minting from "../Minting/Minting";
import "./Contract.css";
import { useAccount } from "wagmi";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { contractAbi } from "../../utils/contractABI";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

function Contract() {
  const location = useLocation();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [wallet, setWallet] = useState("");
  const [reciept, setRecipt] = useState();

  useEffect(() => {
    const walletArray = JSON.parse(localStorage.getItem("walletAddresses"));
    if (location?.search !== "") {
      if (walletArray !== null) {
        const checkWallet = walletArray?.find(
          (x) => x === location.search.slice(8)
        );
        if (checkWallet !== undefined) {
          setWallet(checkWallet);
        } else {
          setWallet(location.search.slice(8));
          localStorage.setItem(
            "walletAddresses",
            JSON.stringify([...walletArray, location.search.slice(8)])
          );
        }
      } else {
        localStorage.setItem(
          "walletAddresses",
          JSON.stringify([location.search.slice(8)])
        );
      }
    }
  }, []);
  const { address } = useAccount();
  const navigate = useNavigate();
  const [minting, setMinting] = useState({
    MATIC: true,
    USD: false,
  });

  const [totalSupply, setTotalSupply] = useState(1);
  const [price, setPrice] = useState(1);
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

  const getValues = async () => {
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      provider
    );
    const result = await contract.totalSupply();
    const result2 = await contract.latestPrice();
    setTotalSupply(result);
    setPrice(result2);
  };
  getValues();

  const sendTransaction = async () => {
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      signer
    );
    try {
      const result = await contract.safeMint(
        wallet !== "" ? wallet : "0x0000000000000000000000000000000000000000",
        parseInt(debouncedQuantity),
        {
          value: ethers.utils.parseEther(
            (
              (100 / (parseInt(price) / 10)) *
              parseInt(debouncedQuantity)
            ).toString()
          ),
        }
      );

      const transactionReciept = await result.wait();
      setRecipt(transactionReciept);
    } catch (error) {
      console.log(error);
    }
  };

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
      <span className="minting-total ">
        {(
          (100 / (parseInt(price) / 10)) *
          parseInt(debouncedQuantity).toString()
        ).toFixed(2)}{" "}
        MATIC + Gas
      </span>
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
        onClick={sendTransaction}
        // disabled={!write || isLoading}
      >
        <span>mint</span>
      </button>
      <div className="contract-bottom">
        <p className="browser-extension">
          Total Minted {parseInt(totalSupply)}/500
        </p>
        <button className="contract-text">
          <span>view contract</span>
        </button>
      </div>
    </Minting>
  );
}

export default Contract;
