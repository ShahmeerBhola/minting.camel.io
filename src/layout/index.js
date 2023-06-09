import React from "react";
import { Outlet } from "react-router-dom";
import {
  Arrow,
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
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import "./index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Layout() {
  console.log(
    "layout",
    window.innerWidth <= 786 && window.location.pathname === "/contract"
  );
  return (
    <div className="layout-container">
      <div
        className="layout-section"
        style={{
          background:
            window.innerWidth <= 786 && window.location.pathname === "/contract"
              ? "transparent"
              : "",
        }}
      >
        <div className="layout-innerwidth">
          <div className="layout-navbar">
            <img className="content-logo" src={ContentLogo} alt="" />
            <img className="racing-logo" src={RacingLogo} alt="" />
            <span className="navbar-line"></span>
            <div className="navbar-btns">
              <Web3NetworkSwitch />
              <Web3Button />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="layout-footer">
        <div className="layout-footer-box">
          <div className="footer-slider">
            <img src={RacingLogo} className="racing-logo" />
            <div class="swiper-button-prev-unique">
              <img src={Arrow} alt="arrow" />
            </div>
            <div class="swiper-button-next-unique">
              <img src={Arrow} alt="arrow" />
            </div>
            <Swiper
              spaceBetween={0}
              slidesPerView={5}
              loop={true}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation, Pagination, EffectCoverflow]}
              navigation={{
                nextEl: ".swiper-button-next-unique",
                prevEl: ".swiper-button-prev-unique",
              }}
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
              loopedSlides={3}
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
