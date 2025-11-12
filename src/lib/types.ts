export interface Post {
  id: string
  title: string
  link: string
  description: string
  pubDate: string
  guid: string
  source: string
  categories: string[]
  image: string
}

export interface PaginatedPosts {
  posts: Post[]
  meta: {
    total: number
    limit?: number
    offset?: number
  }
}

export interface RssResponse {
  source: string
  count: number
  items: Post[]
}

export interface Source {
  id: string
  url: string
  title: string
  logo: string
  logo_width: number
  logo_height: number
  created_at: Date
}

export interface Category {
  id: string
  name: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
  }
  token: string
  token_type: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  tracked_categories: string[]
  tracked_sources: string[]
  role: "user" | "moderator"
  created_at: string
}

export interface ValidationErrors {
  name?: string[]
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
  general?: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormData {
  email: string
  password: string
}
