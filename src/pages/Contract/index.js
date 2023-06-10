import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LightArrow,
  PorscheGreen,
  PorscheLeft,
  PorscheLining,
  PorscheOlive,
  PorschePurple,
  PorscheYellow,
} from "../../assets/images";
import "./index.css";
import { useAccount } from "wagmi";
import { useDebounce } from "use-debounce";
import { contractAbi } from "../../utils/contractABI";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Contract() {
  const location = useLocation();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [wallet, setWallet] = useState("");
  const [reciept, setRecipt] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const walletArray = JSON.parse(localStorage.getItem("walletAddresses"));
    if (location?.search !== "") {
      if (walletArray !== null) {
        const checkWallet = walletArray?.find(
          (x) => x === location.search.slice(8)
        );
        if (checkWallet !== undefined) {
          setWallet(checkWallet);
        } else {
          setWallet(location.search.slice(8));
          localStorage.setItem(
            "walletAddresses",
            JSON.stringify([...walletArray, location.search.slice(8)])
          );
        }
      } else {
        localStorage.setItem(
          "walletAddresses",
          JSON.stringify([location.search.slice(8)])
        );
      }
    }
  }, []);
  const { address } = useAccount();
  const [minting, setMinting] = useState({
    MATIC: true,
    USD: false,
  });

  const [totalSupply, setTotalSupply] = useState(1);
  const [price, setPrice] = useState(1);
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };
  const changeHandler = (e) => {
    if (e.target.name === "MATIC") {
      setMinting((prev) => ({ ...prev, MATIC: true, USD: false }));
    } else {
      setMinting((prev) => ({ ...prev, MATIC: false, USD: true }));
    }
  };
  const debouncedQuantity = useDebounce(count);

  const getValues = async () => {
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      provider
    );
    const result = await contract.totalSupply();
    const result2 = await contract.latestPrice();
    setTotalSupply(result);
    setPrice(result2);
  };
  getValues();

  const sendTransaction = async () => {
    setIsLoading(true);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      signer
    );
    try {
      const result = await contract.safeMint(
        wallet !== "" ? wallet : "0x0000000000000000000000000000000000000000",
        parseInt(debouncedQuantity),
        {
          value: ethers.utils.parseEther(
            (
              (100 / (parseInt(price) / 10)) *
              parseInt(debouncedQuantity)
            ).toString()
          ),
        }
      );

      const transactionReciept = await result.wait();
      setRecipt(transactionReciept);
      toast.success("Transaction successful !!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.code === -32603) {
        toast.error("Insufficient Balance");
      }
    }
  };

  useEffect(() => {
    if (address === undefined) {
      navigate("/");
    }
  }, [address]);
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="contract-container">
        <img
          className="contract-arrow"
          src={LightArrow}
          alt=""
          onClick={() => navigate(-1)}
        />
        <div className="contract-lt">
          <h3 className="contract-lt-h3">Mint your own</h3>
          <p className="contract-lt-p">
            Arabian Camels <br />
            Porsche Racing NFT
          </p>
          <Swiper
            className="refer-swiper"
            spaceBetween={0}
            loop={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Pagination, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
              rotate: 0,
            }}
            centeredSlides={true}
            breakpoints={{
              575: {
                slidesPerView: 5,
              },
              330: {
                slidesPerView: 3,
              },
              200: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide>
              <img className="img-slider" src={PorscheLining} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-slider" src={PorscheYellow} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-slider" src={PorschePurple} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-slider" src={PorscheGreen} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-slider" src={PorscheOlive} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img-slider" src={PorschePurple} alt="" />
            </SwiperSlide>
          </Swiper>
          <img className="contract-lt-img" src={PorscheLeft} alt="" />
        </div>
        <div className="contract-rt">
          <div className="radio-section">
            <div className="radio-in">
              <input
                name="MATIC"
                className="radio"
                type="radio"
                onChange={changeHandler}
                checked={minting?.MATIC}
              />
              <span>MATIC</span>
            </div>
            <div className="radio-in">
              <input
                name="USD"
                className="radio"
                type="radio"
                onChange={changeHandler}
                checked={minting?.USD}
              />
              <span>USD</span>
            </div>
          </div>
          <p className="browser-extension">
            Please use Chrome/Firefox with MetaMask.
          </p>
          <span className="minting-total ">
            {(
              (100 / (parseInt(price) / 10)) *
              parseInt(debouncedQuantity).toString()
            ).toFixed(2)}{" "}
            MATIC + Gas
          </span>
          <div className="contract-calculate">
            <button
              className="contract-btn"
              onClick={decrement}
              disabled={count < 2}
            >
              <p>-</p>
            </button>
            <span className="contract-value">{count}</span>
            <button className="contract-btn">
              <p className="increment" onClick={increment}>
                +
              </p>
            </button>
          </div>
          <button
            className="contract-connect"
            onClick={sendTransaction}
            disabled={isLoading}
          >
            {isLoading && <div className="loader" />}
            <span>mint</span>
          </button>
          <div className="contract-bottom">
            <p className="browser-extension">
              Total Minted
              {parseInt(totalSupply)}/500
            </p>
            <button className="contract-text">
              <span>view contract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contract;
