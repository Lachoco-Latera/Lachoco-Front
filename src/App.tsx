// import { useState } from "react";
import MainCarousel from "./components/Carousel/Carousel";
import Products from "./components/Products/Products";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <MainCarousel />
      <Products />
      {/*<div className=" h-screen border-2 border-b-black p-2 flex flex-col justify-center items-center mx-2">
        <button onClick={() => setCount((count) => count + 1)}>
          count is <b>"{count}"</b>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> 
    
      </div>*/}
    </div>
  );
}

export default App;
