import { useState } from "react"

export const Footer = () => {
    const [monedaState, setMonedaState] = useState(false)

    const handleOnClick = () => {
        setMonedaState(!monedaState)
    }

  return (
    <>
        <footer className="w-full bg-white  shadow dark:bg-gray-800">
        
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-start">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Tiempo de Chocolatear</span>
                {
                    monedaState ? (<div className="w-[200px] absolute z-10 mb-[100px] bg-orange-400"><option value="ARG">ARG</option><option value="MEX">MEX</option></div>) : (null)
                }
                <button className=" mx-5" onClick={handleOnClick}>Cambio de moneda</button>
                
            </div>
           
        </footer>
    </>
  )
}
