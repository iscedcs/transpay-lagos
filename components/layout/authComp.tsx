import React from "react";
import Carousel from "./authCarousel";
import CarouselSlides from "./carouselSlides";

const slides = [
  <>
    <CarouselSlides
      desc="Accountability in a civilized society is the stepping stone to
        development and progressive Environment"
      images="/avater.png"
      author="ISCE Digital Concepts"
      title="Anambra state"
    />
  </>,
  <>
    <CarouselSlides
      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore"
      images="/avater.png"
      author="ISCE Digital Concepts"
      title="Anambra state"
    />
  </>,
  <>
    <CarouselSlides
      desc="knkdnfjdnfdjf jdnfdjfndjdjfndfjdngkfbfg ffgjfgfbgfj gfgbfgjjgbjbgjgbdjbdg
      dgdbdb ngfigtmitgutng gutgnt tngtjg"
      images="/avater.png"
      author="ISCE Digital Concepts"
      title="Anambra state"
    />
  </>,
];

const AuthComp: React.FC = () => {
  return (
    <div className="hidden lg:inline lg:p-[40px] w-[50%] h-full md:p-[20px] p-[60px] bg-gradient-to-b from-primary-900 to-[#978800] text-white rounded-[20px]">
      <p className="font-semibold text-[24px]">LASITRAS</p>
      <div className="lg:pt-[90px] md:pt-[30px]">
        <h5 className="font-bold lg:text-[30px] xl:text-[45px] md:text-[0px]">
          Ensure Drivers are Checked with Maximum Road Safety!!!.
        </h5>
        <h2 className="my-[11px] text-base">
          Where drivers payment are checked and road safety is ensured and money
          can be tracked
        </h2>
        <div className="w-full bg-primary-900 h-[170px] p-4 rounded-[20px]">
          <div className="flex justify-center items-center">
            <Carousel slides={slides} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComp;
