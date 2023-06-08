import React from "react";
import { useNavigate } from "react-router-dom";
import { LightArrow, PorscheLeft } from "../../assets/images";
import "./index.css";

const Contract = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="contract-container">
        <img
          className="contract-arrow"
          src={LightArrow}
          alt=""
          onClick={() => navigate(-1)}
        />
        <div className="contract-lt">
          <h3 className="contract-lt-h3">Mint your own</h3>
          <p className="contract-lt-p">
            Arabian Camels <br />
            Porsche Racing NFT
          </p>
          <img className="contract-lt-img" src={PorscheLeft} alt="" />
        </div>
        <div className="contract-rt">
          <div className="radio-section">
            <div className="radio-in">
              <input
                name="MATIC"
                className="radio"
                type="radio"
                // onChange={changeHandler}
                // checked={minting?.MATIC}
              />
              <span>MATIC</span>
            </div>
            <div className="radio-in">
              <input
                name="USD"
                className="radio"
                type="radio"
                // onChange={changeHandler}
                // checked={minting?.USD}
              />
              <span>USD</span>
            </div>
          </div>
          <p className="browser-extension">
            Please use Chrome/Firefox with MetaMask.
          </p>
          <span className="minting-total ">
            {/* {(
              (100 / (parseInt(price) / 10)) *
              parseInt(debouncedQuantity).toString()
            ).toFixed(2)}{" "} */}
            MATIC + Gas
          </span>
          <div className="contract-calculate">
            <button
              className="contract-btn"
              //   onClick={decrement}
              //   disabled={count < 2}
            >
              <p>-</p>
            </button>
            <span className="contract-value">{/* {count} */}</span>
            <button className="contract-btn">
              <p
                className="increment"
                //   onClick={increment}
              >
                +
              </p>
            </button>
          </div>
          <button
            className="contract-connect"
            // onClick={sendTransaction}
            // disabled={isLoading}
          >
            {/* {isLoading && <div className="loader" />} */}
            <span>mint</span>
          </button>
          <div className="contract-bottom">
            <p className="browser-extension">
              Total Minted
              {/* {parseInt(totalSupply)}/500 */}
            </p>
            <button className="contract-text">
              <span>view contract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
