import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from '../api/auth/api'
import { useAuth } from './useAuth'
import type { ILoginForm } from '../types/IAuth'

export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState<ILoginForm>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { access_token, user } = await AuthApi.login(form)
      login({ name: user.name, email: user.email, telefone: user.telefone, token: access_token })
      navigate('/home')
    } catch {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, handleChange, handleSubmit }
}
