import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Coin, Copy, DarkArrow, LightArrow } from "../../assets/images";
import { toast } from "react-toastify";
import "./index.css";
import {
  isChrome,
  isDesktop,
  isEdge,
  isFirefox,
  isIOS,
  isOpera,
  isSafari,
} from "react-device-detect";

const Earn = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  console.log(address);
  const baseUrl = `${window.location.origin}/contract`;
  const [walletAddress, setWalletAddress] = useState("");
  const linkHandler = () => {
    if (!address) {
      if (isDesktop) {
      } else {
        if (isChrome || isFirefox || isEdge || isSafari || isOpera) {
          if (isIOS) {
            const Url = `dapp://${window.location.origin?.slice(8)}`;
            setTimeout(() => {
              window.open(Url, "_blank");
            }, 2000);
          } else {
            const Url = `https://metamask.app.link/dapp/${window.location.origin?.slice(
              8
            )}`;
            setTimeout(() => {
              window.open(Url, "_blank");
            }, 2000);
          }
        } else {
          setWalletAddress(window?.ethereum?.selectedAddress);
        }
      }
    } else {
      setWalletAddress(address);
    }
  };
  const copyHandler = () => {
    const copylink = `${baseUrl}?wallet=${walletAddress}`;
    navigator.clipboard.writeText(copylink);
    toast.success("Copied!!");
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
            {`${baseUrl}?wallet=${walletAddress}`}
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
