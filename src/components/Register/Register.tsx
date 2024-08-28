import { IRegisterErrors, validationRegister } from '../../helpers/validations'
import React, { useEffect, useState } from 'react'
import verPass from '../../assets/images/verPass.svg'
import ocultarPass from '../../assets/images/ocultarPass.svg'

export const Register: React.FC = () => {
    const [registerState, setRegisterState] = useState({
        name: '',
        lastName: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: ''
    })

    const [registerErrors, setRegisterErrors] = useState<IRegisterErrors>({
        name: '',
        lastName: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: ''
    })

    const [pass, setPass] = useState(false)
    const [confirmPass, setConfirmPass] = useState(false)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target 

        setRegisterState({
            ...registerState, [name]: value
        })
    }

    useEffect(()=>{
        const error = validationRegister(registerState)
        setRegisterErrors(error)
    }, [registerState])

    const handlePass = (event: React.MouseEvent) => {
      event.preventDefault()
      setPass(!pass)
    }

    const handleConfirmPass = (event: React.MouseEvent) => {
      event.preventDefault()
      setConfirmPass(!confirmPass)
    }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
          <form className="max-w-sm mx-auto">
            {/* INPUT NAME */}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
              <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nombre" required onChange={handleOnChange} value={registerState.name}/>
              {registerErrors.name ? (<p className="text-red-800">{registerErrors.name}</p>): null}
            </div>

            {/* INPUT LASTNAME */}
            <div className="mb-5">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
              <input type="text" name="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Apellido" required onChange={handleOnChange} value={registerState.lastName}/>
              {registerErrors.lastName ? (<p className="text-red-800">{registerErrors.lastName}</p>): null}
            </div>

            {/* INPUT EMAIL */}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
              <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@gmail.com" required onChange={handleOnChange} value={registerState.email}/>
              {registerErrors.email ? (<p className="text-red-800">{registerErrors.email}</p>): null}
            </div>

            {/* INPUT COUNTRY */}
            <div className="mb-5">
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 ">Pais</label>
              <select name="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleOnChange} value={registerState.country}>
                <option value="">Seleccione un país</option>
                <option value="colombia">Colombia</option>
                <option value="españa">España</option>
              </select>
              {registerErrors.country ? (<p className="text-red-800">{registerErrors.country}</p>): null}
            </div>

            {/* INPUT PASSWORD */}
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
              {
                pass ? (<div className='flex items-center'>
                  <input type="text" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={registerState.password} /> 
                  <button onClick={handlePass}><img src={ocultarPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
                </div>) : ( <div className='flex items-center'>
                <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={registerState.password} /> 
                <button onClick={handlePass}><img src={verPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
              </div>)
              }
              {registerErrors.password ? (<p className="text-red-800">{registerErrors.password}</p>): null}
            </div>

            {/* INPUT CONFIRM PASSWORD */}
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirmar Contraseña</label>
              {
                confirmPass ? (<div className='flex items-center'>
                  <input type="text" name="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={registerState.confirmPassword}/>
                  <button onClick={handleConfirmPass}><img src={ocultarPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
                </div>) : ( <div className='flex items-center'>
                  <input type="password" name="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={registerState.confirmPassword}/>
                <button onClick={handleConfirmPass}><img src={verPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
              </div>)
              }
              {registerErrors.confirmPassword ? (<p className="text-red-800">{registerErrors.confirmPassword}</p>): null}
            </div>

           
            {/* BOTON SUBMIT */}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Iniciar Sesion</button>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
              <p>¿Aun no tienes cuenta? <a href="">Registrate</a></p>
              </div>
              
            </div>
          </form>
    </div>
  )
}
