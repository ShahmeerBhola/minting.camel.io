import React from "react";
import { Outlet } from "react-router-dom";
import { useConnect, useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import {
  ContentLogo,
  PorscheGreen,
  PorscheGroup,
  PorscheLining,
  PorscheOlive,
  PorschePurple,
  PorscheRed,
  PorscheYellow,
  RacingLogo,
} from "../assets/images";
import Slider from "../components/Slider";
// import Swip from 'react-id-swiper';
import "./index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Layout() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  console.log("connectors", connectors, address);
  return (
    <div className="layout-container">
      <>
        {/* {chain && <div>Connected to {chain.name}</div>} */}
        {/* {chains.map((x) => (
          <button
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            {x.name}
            {isLoading && pendingChainId === x.id && " (switching)"}
          </button>
        ))} */}
      </>
      <div className="layout-section">
        <div className="layout-innerwidth">
          <div className="layout-navbar">
            <img className="content-logo" src={ContentLogo} alt="" />
            <img className="racing-logo" src={RacingLogo} alt="" />
            <span className="navbar-line"></span>
            <div className="navbar-btns">
              <button className="network">
                <span>{chain ? chain.name : "Select Network"}</span>
              </button>
              <>
                {connectors.map((connector) => (
                  <>
                    {connector.name === "MetaMask" && (
                      <button
                        disabled={!connector.ready}
                        key={connector.id}
                        className="wallet"
                        onClick={() => connect({ connector })}
                      >
                        <span>{address ? address : "Connect Wallet"}</span>
                      </button>
                    )}
                  </>
                ))}
              </>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="layout-footer">
        <div className="layout-footer-box">
          <div className="footer-slider">
            <img src={RacingLogo} className="racing-logo" />
            <Swiper
              spaceBetween={0}
              slidesPerView={5}
              loop={true}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation, Pagination, EffectCoverflow]}
              navigation
              effect="coverflow"
              pagination={{ clickable: true }}
              coverflowEffect={{
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
                rotate: 0,
              }}
              centeredSlides={true}
              loopedSlides={5}
            >
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
              <SwiperSlide>
                <img className="img-slider" src={PorscheLining} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
