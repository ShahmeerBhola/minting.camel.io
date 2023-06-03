import { Web3Button } from "@web3modal/react";
import React, { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { Porsche911 } from "../../assets/images";
import Minting from "../Minting/Minting";
import { Modal } from "../Modal/Modal";
import "./Refer.css";

function Refer() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  function clickHandler() {
    setShow(true);
  }
  // useEffect(() => {
  //   if (isIOS) {
  //     if (window?.ethereum && window?.ethereum?.isMetaMask) {
  //     } else {
  //       toast.warning("Install Metamask through AppStore");
  //       const Url = `metamask://dapp/${window.location.origin?.slice(8)}`;
  //       setTimeout(() => {
  //         window.open(Url, "_blank");
  //       }, 2000);
  //     }
  //   }
  // }, []);

  const onClick = () => {
    toast.info("Minting Will Start Soon..");
  };
  // isIOS ? (
  //   <button className="mob-link">
  //     <a href="dapp://localhost:3000">Connect Wallet</a>
  //   </button>
  // ) :
  //  (
  //   <div className="my-web3-button">
  //     <Web3Button />
  //   </div>
  // )
  return (
    <>
      <Minting>
        <img className="camel" src={Porsche911} alt="Camel" />
        {address === undefined ? (
          <div className="my-web3-button">
            <Web3Button />
          </div>
        ) : (
          <button
            className="connect"
            // onClick={() => navigate("/contract")}
            onClick={onClick}
          >
            <span>Mint</span>
          </button>
        )}
        {address && (
          <button className="refer" onClick={clickHandler}>
            <span>refer & earn</span>
          </button>
        )}
      </Minting>
      <Modal onClose={() => setShow(false)} show={show} />
    </>
  );
}

export default Refer;
