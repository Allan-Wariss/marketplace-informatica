import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersApi, { type IUpdateProfileForm } from '../api/users/api'
import type { IUser } from '../types/IUser'
import { useAuth } from './useAuth'

// NOVO: regex simples de validação de email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    // NOVO: função de validação reutilizável
    const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim())

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setSuccess(false)

        // NOVO: valida o email em tempo real, sem travar a digitação
        if (name === 'email') {
            if (value && !isValidEmail(value)) {
                setError('Digite um e-mail válido')
            } else {
                setError(null)
            }
        } else {
            setError(null)
        }
    }

    const setFieldValue = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }))
        setError(null)
        setSuccess(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // NOVO: validação final antes de enviar pra API
        if (!form.email || !isValidEmail(form.email)) {
            setError('Digite um e-mail válido antes de salvar')
            return
        }

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