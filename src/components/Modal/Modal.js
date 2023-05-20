import React from "react";
import { Cancel, Coin } from "../../assets/images";
import "./Modal.css";

export const Modal = ({ onClose, show }) => {
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
              4. Earn a 5% commission on each NFT sale made through your link.
            </li>
            <li>5. Commissions are automatically credited to your wallet.</li>
            <li>6. Unlimited earning potential!</li>
          </ol>
          <div className="modal-btn">
            <button className="modal-generate">
              <span>Generate Link</span>
            </button>
            <div className="generated-link"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
