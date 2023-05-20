import React from "react";
import "./HomePage.css";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import Contract from "../Contract/Contract";

function HomePage() {
  return (
    <div className="container">
      <div className="top-right-buttons">
        <Web3Button />
        <Web3NetworkSwitch />
      </div>
      <div className="centered-content"></div>
      <Contract />
    </div>
  );
}

export default HomePage;
