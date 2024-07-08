import { useState } from "react"
import { Suscripcion } from "./Suscripcion"
import { Facturas } from "./Facturas"
import { Pedidos } from "./Pedidos"
import { PerfilUser } from "./PerfilUser"

export const UserConfig = () => {
    const [containerState, setContainerState] = useState<string>()
    
    const handleOnClick = (prop: string) => {
        setContainerState(prop)
    }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex">
        <div className="w-1/5 min-h-screen flex flex-col justify-start items-start bg-neutral-300">
            <button className="w-full h-[50px]  text-start text-lg font-semibold hover:bg-slate-400" onClick={()=>handleOnClick('suscripcion')}>Gestionar suscripciones</button>
            <button className="w-full h-[50px]  text-start text-lg font-semibold hover:bg-slate-400" onClick={()=>handleOnClick('facturas')}>Ver y descargar facturas</button>
            <button className="w-full h-[50px]  text-start text-lg font-semibold hover:bg-slate-400" onClick={()=>handleOnClick('pedidos')}>Realizar nuevos pedidos</button>
            <button className="w-full h-[50px]  text-start text-lg font-semibold hover:bg-slate-400" onClick={()=>handleOnClick('perfil')}>Editar perfil</button>
        </div>
        <div className="w-4/5 min-h-screen">
        {
            containerState === 'suscripcion' ? (<Suscripcion/>) : (null)
        }
        {
            containerState === 'facturas' ? (<Facturas/>) : (null)
        }
        {
            containerState === 'pedidos' ? (<Pedidos/>) : (null)
        }
        {
            containerState === 'perfil' ? (<PerfilUser/>) : (null)
        }
    
        </div>
    </div>
  )
}
