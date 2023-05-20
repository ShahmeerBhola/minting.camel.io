import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import React from "react";
import { useAccount } from "wagmi";
import { Logo, Porsche } from "../../assets/images";
import "./Minting.css";
import { useLocation } from "react-router-dom";

function Minting({ children }) {
  const location = useLocation();
  const { address } = useAccount();
  return (
    <div className="minting-container">
      <div className="minting-buttons">
        {location.pathname === "/" && address !== undefined && <Web3Button />}
        {location.pathname === "/contract" && <Web3Button />}
        <Web3NetworkSwitch />
      </div>
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
