import { useState } from 'react'
import Logo from './Logo'
import AuthAction from './AuthButton'
import { Link } from '@tanstack/react-router'
import ToggleTheme from './ToggleTheme'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', slug: '/' },
    { name: 'Categories', slug: '/categories' },
    { name: 'Preferences', slug: '/profile' },
  ]

  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.slug}
                to={link.slug}
                className="font-medium transition-colors hover:scale-105 text-[var(--text)]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex gap-4">
            <AuthAction />
            <ToggleTheme />
          </div>

          <button
            className="lg:hidden p-2 rounded-lg border-[1px] border-[var(--border)] border-[var(--button-bg)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 lg:hidden py-4 rounded-lg border bg-[var(--card-bg)] border-[var(--border)]">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={link.slug}
                  className="font-medium py-2 text-[var(--text)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--border)] flex gap-4">
                <AuthAction />
                <ToggleTheme />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
