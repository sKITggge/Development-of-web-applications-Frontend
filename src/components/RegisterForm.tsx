import { useContext, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useRegisterMutation } from '../lib/api'
import { validateRegisterForm } from '../lib/utils'
import type { ValidationErrors, RegisterFormData } from '../lib/types'
import { AuthContext } from '../contexts/AuthContext'

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation()
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidationErrors({})

    const formData = new FormData(event.currentTarget)
    
    const formValues: RegisterFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    const errors = validateRegisterForm(formValues)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    try {
      await register({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      }).unwrap()

      authContext?.toggleAuthed(true)
      navigate({ to: '/' })
      
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  const clearFieldError = (fieldName: keyof ValidationErrors) => {
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }))
  }

  return (
    <div className="w-full max-w-xl bg-[var(--bg)]">
      <h1 className="text-center mb-8">Create Account</h1>

      <form
        className="bg-[var(--surface)] p-4 space-y-6 sm:p-8 shadow-[var(--card-shadow)] border border-[var(--card-border)]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-2"
            >
              Full Name
            </label>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              onChange={() => clearFieldError('name')}
              className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-sm placeholder-[var(--muted-2)] ${
                validationErrors.name
                  ? 'border-[var(--status-error)]'
                  : 'border-[var(--border)]'
              }`}
              placeholder="Enter your full name"
            />
            {validationErrors.name && (
              <div className="mt-1 text-[var(--status-error)]">
                {validationErrors.name.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2"
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={() => clearFieldError('email')}
              className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-sm placeholder-[var(--muted-2)] ${
                validationErrors.email
                  ? 'border-[var(--status-error)]'
                  : 'border-[var(--border)]'
              }`}
              placeholder="Enter your email"
            />
            {validationErrors.email && (
              <div className="mt-1 text-[var(--status-error)]">
                {validationErrors.email.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              onChange={() => clearFieldError('password')}
              className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-sm placeholder-[var(--muted-2)] ${
                validationErrors.password
                  ? 'border-[var(--status-error)]'
                  : 'border-[var(--border)]'
              }`}
              placeholder="Create a password (min. 8 characters)"
            />
            {validationErrors.password && (
              <div className="mt-1 text-[var(--status-error)]">
                {validationErrors.password.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm mb-2"
            >
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              onChange={() => clearFieldError('confirmPassword')}
              className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-sm placeholder-[var(--muted-2)] ${
                validationErrors.confirmPassword
                  ? 'border-[var(--status-error)]'
                  : 'border-[var(--border)]'
              }`}
              placeholder="Confirm your password"
            />
            {validationErrors.confirmPassword && (
              <div className="mt-1 text-[var(--status-error)]">
                {validationErrors.confirmPassword.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--accent)] py-3 px-4 rounded-sm font-semibold 
          hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
        >
          Create Account
        </button>

        <div className="text-center">
          <p className="text-sm text-[var(--muted)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[var(--accent)] hover:text-[var(--link-hover)] font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
