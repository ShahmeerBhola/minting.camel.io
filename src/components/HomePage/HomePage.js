import React from "react";
import { Mint } from "../Mint/Mint";
import "./HomePage.css";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

function HomePage() {
  return (
    <div className="container">
      <div className="top-right-buttons">
        <Web3Button />
        <Web3NetworkSwitch />
      </div>
      <div className="centered-content"></div>
      <Mint />
    </div>
  );
}

export default HomePage;
