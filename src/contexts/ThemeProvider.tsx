import { type ReactNode, useEffect, useState } from 'react'
import type { Theme } from './ThemeContext'
import { ThemeContext } from './ThemeContext'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || 'light'
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const contextValue = {
    theme,
    toggleTheme,
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
