import { ILoginErrors, validationLogin } from "../../helpers/validations"
import { useEffect, useState } from "react"
import verPass from '../../../public/images/verPass.svg'
import ocultarPass from '../../../public/images/ocultarPass.svg'

export const Login: React.FC = () => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  })

  const [errorState, setErrorState] = useState<ILoginErrors>({email: '',
    password: ''})

    const [pass, setPass] = useState(false)


  useEffect(() => {
    const error = validationLogin(loginState)
    setErrorState(error)
  }, [loginState])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    setLoginState({
      ...loginState, 
      [name]: value,
    })
    console.log(loginState)
  }

  const handlePass = (event: React.MouseEvent) => {
    event.preventDefault()
    setPass(!pass)
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
          <form className="max-w-sm mx-auto">
            {/* INPUT EMAIL */}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
              <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@gmail.com" required onChange={handleOnChange} value={loginState.email}/>
              {errorState.email ? (<p className="text-red-800">{errorState.email}</p>): null}
            </div>
            {/* INPUT PASSWORD */}
            <div className="mb-5">
            { pass ? (<div className='flex items-center'>
                  <input type="text" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={loginState.password} /> 
                  <button onClick={handlePass}><img src={ocultarPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
                </div>) : ( <div className='flex items-center'>
                <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="********" required onChange={handleOnChange} value={loginState.password} /> 
                <button onClick={handlePass}><img src={verPass} alt="" className='w-[25px] h-[25px] ml-1'/></button> 
              </div>)
              }
              {errorState.password ? (<p className="text-red-800">{errorState.password}</p>): null}
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
