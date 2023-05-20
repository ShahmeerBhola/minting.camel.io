import React from "react";
import { Camel, Logo, Porsche } from "../../assets/images";
import "./Minting.css";

function Minting({ children }) {
  return (
    <div className="minting-container">
      <div className="minting-section">
        <div className="minting-image"></div>
        <div className="minting-content">
          <img className="logo" src={Logo} alt="logo" />
          <img className="porsche" src={Porsche} alt="Porsche" />
          <p className="content">
            Mint your Arabian Camels
            <br /> Porsche Racing NFT
          </p>
          <>{children}</>
        </div>
      </div>
    </div>
  );
}

export default Minting;
