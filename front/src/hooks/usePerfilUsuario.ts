import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersApi, { type IUpdateProfileForm } from '../api/users/api'
import type { IUser } from '../types/IUser'
import { useAuth } from './useAuth'

export const usePerfilUsuario = () => {
    const { login, logout, user: authUser } = useAuth()
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState<IUpdateProfileForm>({
        name: '',
        email: '',
        telefone: '',
    })

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        UsersApi.getMe()
            .then((data) => {
                if (cancelled) return
                setUser(data)
                setForm({
                    name: data.name,
                    email: data.email,
                    telefone: data.telefone ?? '',
                })
            })
            .catch(() => setError('Erro ao carregar dados do perfil.'))
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError(null)
        setSuccess(false)
    }

    const setFieldValue = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }))
        setError(null)
        setSuccess(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError(null)
        setSuccess(false)
        try {
            const payload: IUpdateProfileForm = { ...form }
            if (!payload.telefone) delete payload.telefone
            const updated = await UsersApi.updateMe(payload)
            setUser(updated)
            setForm({
                name: updated.name,
                email: updated.email,
                telefone: updated.telefone ?? '',
            })
            // Sincroniza o localStorage com os novos dados
            if (authUser) {
                login({ ...authUser, name: updated.name, email: updated.email, telefone: updated.telefone ?? null })
            }
            setSuccess(true)
        } catch (err: any) {
            const msg = err?.response?.data?.message
            setError(typeof msg === 'string' ? msg : 'Erro ao salvar alterações.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        setDeleting(true)
        try {
            await UsersApi.deleteMe()
            logout()
            navigate('/home')
        } catch (err: any) {
            const msg = err?.response?.data?.message
            setError(typeof msg === 'string' ? msg : 'Erro ao deletar conta.')
            setDeleting(false)
        }
    }

    return { user, form, loading, saving, deleting, error, success, handleChange, setFieldValue, handleSubmit, handleDelete }
}
