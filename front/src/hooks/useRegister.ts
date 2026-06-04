import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersApi from '../api/users/api'
import type { IRegisterForm } from '../types/IAuth'

export const useRegister = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState<IRegisterForm>({
        name: '',
        email: '',
        password: '',
        telefone: '',
    })
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
            const payload: IRegisterForm = { ...form }
            if (!payload.telefone) delete payload.telefone
            await UsersApi.register(payload)
            navigate('/login')
        } catch (err: any) {
            const msg = err?.response?.data?.message
            setError(typeof msg === 'string' ? msg : 'Erro ao criar conta. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return { form, loading, error, handleChange, handleSubmit }
}
