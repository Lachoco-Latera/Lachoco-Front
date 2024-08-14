// import { useState } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onCartIconClick: () => void;
}
import { IoMdExit } from "react-icons/io";

const Drawer = ({ children, isOpen, onCartIconClick }: Props) => {
  const backdropClass = isOpen
    ? "fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-[55]"
    : "hidden";
  return (
    <div>
      {/* Fondo negro con opacidad */}
      <div className={backdropClass} onClick={onCartIconClick}></div>

      {/* Contenido del drawer */}
      <div
        className={`fixed top-0 right-0 h-full md:w-1/2 w-full bg-white text-white transition duration-500 ease-in-out transform z-[60] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <aside className="h-full overflow-y-auto shadow">
          <header className=" bg-gray-100 text-white py-4 flex items-center justify-end px-4 h-14">
            <div>
              <button className="text-gray-800" onClick={onCartIconClick}>
                <IoMdExit size={28}/>
              </button>
            </div>
          </header>
          <main className="bg-white p-4 px-6 text-black">{children}</main>
        </aside>
      </div>
    </div>
  );
};

export default Drawer;
