import React, { useState } from "react";
import { Camel } from "../../assets/images";
import Minting from "../Minting/Minting";
import { Modal } from "../Modal/Modal";
import "./Refer.css";

function Refer() {
  const [show, setShow] = useState(false);
  function clickHandler() {
    setShow(true);
  }
  return (
    <>
      <Minting>
        <img className="camel" src={Camel} alt="Camel" />
        <button className="connect">
          <span>connect</span>
        </button>
        <button className="refer" onClick={clickHandler}>
          <span>refer & earn</span>
        </button>
      </Minting>
      <Modal onClose={() => setShow(false)} show={show} />
    </>
  );
}

export default Refer;
