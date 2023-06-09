import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Cancel, Coin, Copy, DarkArrow, LightArrow } from "../../assets/images";
import "./index.css";

const Earn = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const baseUrl = `${window.location.origin}/contract`;
  const [walletAddress, setWalletAddress] = useState("");
  const linkHandler = () => {
    setWalletAddress(address);
  };
  const copyHandler = () => {
    const copylink = `${baseUrl}?wallet=${walletAddress}`;
    navigator.clipboard.writeText(copylink);
    navigate("/");
  };
  return (
    <div
      className="wrapper"
      style={{
        background: walletAddress
          ? "linear-gradient(0deg, #3CB4D9 0%, #FEFFFD 100%) "
          : "",
      }}
    >
      <div className="earn-container">
        {window.innerWidth > 786 && (
          <img
            className="earn-arrow"
            src={walletAddress ? DarkArrow : LightArrow}
            alt=""
            onClick={() => navigate(-1)}
          />
        )}
        {window.innerWidth <= 786 && (
          <img
            className="earn-arrow"
            src={LightArrow}
            alt=""
            onClick={() => navigate(-1)}
          />
        )}
        <div className="earn-left">
          <img src={Coin} alt="Coin" />
        </div>
        <div className="earn-right">
          <h3
            className="heading"
            style={{ color: walletAddress ? "#000" : "" }}
          >
            Refer & Win
          </h3>
          <h6
            className="sub-heading"
            style={{
              color: walletAddress && window.innerWidth > 786 ? "#000" : "",
            }}
          >
            Start monetizing your influence today. Join us!
          </h6>
          <ol className="list">
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              1. Visit our website and connect your wallet.
            </li>
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              2. Get your unique Refer & Earn link.
            </li>
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              3. Share the link with your audience.
            </li>
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              4. Earn a 10% commission on each NFT sale made through your link.
            </li>
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              5. Commissions are automatically credited to your wallet.
            </li>
            <li
              style={{
                color: walletAddress && window.innerWidth > 786 ? "#000" : "",
              }}
            >
              6. Unlimited earning potential!
            </li>
          </ol>
          <div className="earn-btn">
            {walletAddress == "" ? (
              <button className="earn-generate" onClick={linkHandler}>
                <span>Generate Link</span>
              </button>
            ) : (
              <button
                className="earn-generate"
                onClick={copyHandler}
                style={{
                  border: "none",
                  background: "linear-gradient(0deg, #02198B 0%, #000137 100%)",
                }}
              >
                <span style={{ color: window.innerWidth > 786 && "#F4F5F7" }}>
                  COPY LINK
                </span>
                <img className="copy-icon" src={Copy} alt="copy-icon" />
              </button>
            )}
            {/* <div className="generated-link">
              <span>{walletAddress && walletAddress}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
