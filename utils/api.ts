// ── API Client ── communicates with FastAPI backend at https://cctv-api.desa-sidomukti.com
const BASE_URL = 'https://cctv-api.desa-sidomukti.com'

interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

async function apiFetch(path: string, options: FetchOptions = {}) {
  const url = new URL(`${BASE_URL}${path.startsWith('/') ? path : '/' + path}`)
  if (options.params) {
    Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, v))
  }

  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // Attach JWT if available
  if (process.client) {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(url.toString(), { ...options, headers })

  // Auto-refresh on 401
  if (response.status === 401 && process.client) {
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken && !path.includes('/auth/refresh-token')) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })
        if (refreshRes.ok) {
          const data = await refreshRes.json()
          localStorage.setItem('access_token', data.access_token)
          if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token)
          headers.set('Authorization', `Bearer ${data.access_token}`)
          const retry = await fetch(url.toString(), { ...options, headers })
          if (retry.ok) return handleResponse(retry)
        }
      } catch (_) { /* fall through to logout */ }

      // Refresh failed → force logout
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
      throw new Error('Session expired. Please login again.')
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || `Request failed (${response.status})`)
  }

  return handleResponse(response)
}

async function handleResponse(response: Response) {
  if (response.status === 204) return null
  return response.json()
}

export const api = {
  get: (path: string, opts?: FetchOptions) => apiFetch(path, { ...opts, method: 'GET' }),
  post: (path: string, body?: any, opts?: FetchOptions) =>
    apiFetch(path, { ...opts, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (path: string, body?: any, opts?: FetchOptions) =>
    apiFetch(path, { ...opts, method: 'PUT', body: JSON.stringify(body) }),
  delete: (path: string, opts?: FetchOptions) => apiFetch(path, { ...opts, method: 'DELETE' }),
}
