const API_BASE = 'http://localhost:4001'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.error || 'Request failed'
    throw new Error(message)
  }
  return data
}

export const api = {
  async register({ name, email, password }) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },
  async login({ email, password }) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  async me(token) {
    return request('/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

