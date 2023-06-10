import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  PorscheRedCircle,
  PorscheGt,
  PorscheLining,
  PorscheYellow,
  PorschePurple,
  PorscheGreen,
  PorscheOlive,
} from "../../assets/images";
import "./index.css";
import { Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
          <p className="refer-lt-d">
            Iconic Porsche racing team. Arabian Camels Porsche Racing team is
            the first Motorsport team to be co-owned by celebrities, influencers
            and motorsport fans from around the globe - Digitally Syndicated
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
