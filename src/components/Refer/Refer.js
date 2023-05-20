import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camel } from "../../assets/images";
import Minting from "../Minting/Minting";
import { Modal } from "../Modal/Modal";
import "./Refer.css";

function Refer() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  function clickHandler() {
    setShow(true);
  }
  return (
    <>
      <Minting>
        <img className="camel" src={Camel} alt="Camel" />
        <button className="connect" onClick={()=>navigate('/contract')}>
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
