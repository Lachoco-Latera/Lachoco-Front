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
        <div>
          <img
            alt=""
            src="https://lachoco-latera.com/wp-content/uploads/2024/02/home1-2048x1152.png"
          />
          {/* <p className="legend bg-white text-red-700">Algo Acá 1</p> */}
        </div>
        <div>
          <img
            alt=""
            src="https://lachoco-latera.com/wp-content/uploads/2024/02/home1-2048x1152.png"
          />
          {/* <p className="legend">Algo Acá 2</p> */}
        </div>
        <div>
          <img
            alt=""
            src="https://lachoco-latera.com/wp-content/uploads/2024/02/home1-2048x1152.png"
          />
          {/* <p className="legend">Algo Acá 3</p> */}
        </div>
        <div>
          <img
            alt=""
            src="https://lachoco-latera.com/wp-content/uploads/2024/02/home1-2048x1152.png"
          />
          {/* <p className="legend">Algo Acá 4</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default MainCarousel;
