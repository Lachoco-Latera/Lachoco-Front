import { getUser } from "@/module/users"
import { useUser } from "@clerk/clerk-react"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate()
  const { user } = useUser()
  const [checked, setChecked] = useState(false);
  

  const check = useCallback(async (emailUser: string | undefined) => {
    const response = await getUser()
    const userAuthenticated = response
    .data
    .find((userData: Record<string, string>)=> emailUser === userData.email)
    
    if(!userAuthenticated || userAuthenticated.role !== "ADMIN") {
      navigate('/')
    } else {
      setChecked(true)
    }
  }, [user])

  useEffect(() => {
    const emailUser = user?.primaryEmailAddress?.emailAddress
    if (emailUser) check(emailUser)
  }, [])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
