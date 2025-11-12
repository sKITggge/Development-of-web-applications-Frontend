import { useContext } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { removeToken } from '../lib/utils'
import { AuthContext } from '../contexts/AuthContext'

function LoggedOutButtons() {
  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="font-medium transition-colors text-[var(--text)] hover:text-[var(--link-hover)]"
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className="bg-[var(--accent)] text-white px-4 py-2 rounded-sm font-medium transition-all hover:opacity-90 hover:bg-[var(--border)]"
      >
        Sign Up
      </Link>
    </div>
  )
}

function LoggedInButtons() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const handleLogout = () => {
    removeToken()

    authContext?.toggleAuthed(false)
    navigate({ to: '/' })
  }

  return (
    <button
      onClick={handleLogout}
      className="
        bg-[var(--button-bg)] border border-[var(--border)] px-4 py-2 rounded-sm font-medium 
          transition-all hover:opacity-90 text-[var(--text)] cursor-pointer hover:bg-[var(--border)]"
    >
      Logout
    </button>
  )
}

export default function AuthAction() {
  const authContext = useContext(AuthContext)

  return <>{authContext?.isAuthed ? <LoggedInButtons /> : <LoggedOutButtons />}</>
}
