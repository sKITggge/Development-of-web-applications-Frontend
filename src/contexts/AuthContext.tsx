import { createContext} from 'react'

export interface AuthContextProps {
    isAuthed: boolean
    toggleAuthed: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)