import React from "react";
import { useNavigate } from "react-router-dom";
import { PorscheRedCircle, PorscheGt } from "../../assets/images";
import "./index.css";

const Refer = () => {
  console.log(window.innerWidth, "window.screen.width");
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="refer-container">
        <div className="refer-lt">
          <h3 className="refer-lt-h3">Mint your own</h3>
          <p className="refer-lt-p">
            Arabian Camels <br />
            Porsche Racing NFT
          </p>
          <p className="refer-lt-d">
            Iconic Porsche racing team. Arabian Camels Porsche Racing team is
            the first Motorsport team to be co-owned by celebrities, influencers
            and motorsport fans from around the globe - D igitally Syndicated
            through blockchain.
          </p>
          <div className="refer-lt-btns">
            <button
              className="refer-lt-mint"
              onClick={() => navigate("/contract")}
            >
              <span>MINT</span>
            </button>
            <button
              className="refer-lt-earn"
              onClick={() => navigate("/refer-earn")}
            >
              <span>Refer & Earn</span>
            </button>
          </div>
        </div>
        <div className="refer-rt">
          <img
            className="refer-rt-img"
            src={window?.innerWidth > 786 ? PorscheRedCircle : PorscheGt}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Refer;
