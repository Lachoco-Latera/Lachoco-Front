import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const MainCarousel = () => {
  return (
    <div className="">
      <Carousel
        axis="horizontal"
        showArrows={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        <div className="">
          <img
            alt="Cacao pod"
            src="./public\images\img-23.webp"
            className=" h-screen object-cover"
          />
          {/* <p className="legend bg-white text-red-700">Algo Acá 1</p> */}
        </div>
        <div className="">
          <img
            alt="Natural cacao chocolate sugar free"
            src="./public\images\img-24.webp"
            className=" h-screen object-cover"
          />

          {/* <p className="legend">Algo Acá 2</p> */}
        </div>
        <div className="">
          <img
            alt="Cacao pod in half"
            src="./public\images\img-25.webp"
            className=" h-screen object-cover"
          />
          {/* <p className="legend">Algo Acá 3</p> */}
        </div>
        <div className="">
          <img
            alt="Two natural cacao chocolates"
            src="./public\images\img-33.webp"
            className=" h-screen object-cover"
          />
          {/* <p className="legend">Algo Acá 4</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default MainCarousel;
