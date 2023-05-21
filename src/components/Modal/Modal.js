import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Cancel, Coin } from "../../assets/images";
import "./Modal.css";

export const Modal = ({ onClose, show }) => {
  const { address } = useAccount();
  // const baseUrl = "http://localhost:3000/contract";
  const baseUrl = "https://referral-front-end.vercel.app/contract";
  const [walletAddress, setWalletAddress] = useState("");
  const linkHandler = () => {
    setWalletAddress(address);
  };
  const copyHandler = () => {
    const copylink = `${baseUrl}?wallet=${walletAddress}`;
    navigator.clipboard.writeText(copylink);
    onClose?.();
  };
  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="content">
        <img className="modal-close" src={Cancel} alt="" onClick={onClose} />
        <h3 className="modal-mob-heading">Refer & Win</h3>
        <div className="modal-left">
          <img src={Coin} alt="Coin" />
        </div>
        <div className="modal-right">
          <h3 className="heading">Refer & Win</h3>
          <h6 className="sub-heading">
            Start monetizing your influence today. Join us!
          </h6>
          <ol className="list">
            <li>1. Visit our website and connect your wallet.</li>
            <li>2. Get your unique Refer & Earn link.</li>
            <li>3. Share the link with your audience.</li>
            <li>
              4. Earn a 10% commission on each NFT sale made through your link.
            </li>
            <li>5. Commissions are automatically credited to your wallet.</li>
            <li>6. Unlimited earning potential!</li>
          </ol>
          <div className="modal-btn">
            {walletAddress == "" ? (
              <button className="modal-generate" onClick={linkHandler}>
                <span>Generate Link</span>
              </button>
            ) : (
              <button
                className="modal-generate"
                onClick={copyHandler}
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, #5095FD 0%, #005B9C 100%)",
                }}
              >
                <span style={{ color: "#F4F5F7" }}>COPY LINK</span>
              </button>
            )}
            <div className="generated-link">
              <span>{walletAddress && walletAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
