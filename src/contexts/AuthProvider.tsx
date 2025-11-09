import { type ReactNode, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<boolean>(() => {
    const isAuthed = localStorage.getItem('authToken')
    return !!isAuthed
  })

  const toggleAuth = (isAuthed: boolean) => {
    setAuth(isAuthed)
  }

  const authedValue = {
    isAuthed: auth,
    toggleAuthed: toggleAuth
  }

  useEffect(() => {

  }, [auth])

  return (
    <AuthContext.Provider value={authedValue}>
      {children}
    </AuthContext.Provider>
  )
}
