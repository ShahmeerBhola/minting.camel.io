import React, { useState } from "react";
import Minting from "../Minting/Minting";
import "./Contract.css";

function Contract() {
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
    console.log("heee", e.target.name);
    if (e.target.name === "MATIC") {
      setMinting((prev) => ({ ...prev, MATIC: true, USD: false }));
    } else {
      setMinting((prev) => ({ ...prev, MATIC: false, USD: true }));
    }
  };
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
      <button className="contract-connect">
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
