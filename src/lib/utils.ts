import type { LoginFormData, RegisterFormData, ValidationErrors } from './types'

export function isHtmlContent(text: string): boolean {
  const htmlPattern = /<([a-z][a-z0-9]*)[^>]*?(\/)?>|&[a-z]+;/i
  return htmlPattern.test(text)
}

export const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token)
}

export const getToken = (): string | null => {
  return localStorage.getItem('authToken')
}

export const removeToken = (): void => {
  localStorage.removeItem('authToken')
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}

export const getAuthHeaders = (): HeadersInit => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const validateRegisterForm = (data: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Name must be at least 2 characters long']
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = ['Please enter a valid email address']
  }

  if (!data.password || data.password.length < 8) {
    errors.password = ['Password must be at least 8 characters long']
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ['Passwords do not match']
  }

  return errors
}

export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = ['Please enter a valid email address']
  }

  if (!data.password) {
    errors.password = ['Password is required']
  }

  return errors
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
