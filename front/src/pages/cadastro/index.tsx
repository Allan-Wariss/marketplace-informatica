import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/useRegister'
import { formatPhone } from '../../utils/formatPhone'
import './cadastro.css'

export const Cadastro = () => {
    const { form, loading, error, handleChange, handleSubmit, setFieldValue } = useRegister()

    const handleTelefoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Backspace' && e.key !== 'Delete') return

        const target = e.currentTarget
        if (target.selectionStart !== target.value.length || target.selectionEnd !== target.value.length) return

        e.preventDefault()

        const numbers = form.telefone.replace(/\D/g, '')
        const nextNumbers = numbers.slice(0, -1)

        setFieldValue('telefone', formatPhone(nextNumbers))
    }

    return (
        <div className="cadastro-page">
            <div className="cadastro-card">
                <h1 className="cadastro-card__title">Criar conta</h1>
                <p className="cadastro-card__subtitle">Junte-se ao Marketplace Informática</p>

                <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
                    <div className="cadastro-form__field">
                        <label className="cadastro-form__label" htmlFor="name">Nome completo</label>
                        <input
                            className="cadastro-form__input"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="João Silva"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="cadastro-form__field">
                        <label className="cadastro-form__label" htmlFor="email">E-mail</label>
                        <input
                            className="cadastro-form__input"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="cadastro-form__field">
                        <label className="cadastro-form__label" htmlFor="password">Senha</label>
                        <input
                            className="cadastro-form__input"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="cadastro-form__field">
                        <label className="cadastro-form__label" htmlFor="telefone">
                            Telefone <span className="cadastro-form__optional">(opcional)</span>
                        </label>
                        <input
                            className="cadastro-form__input"
                            id="telefone"
                            name="telefone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={form.telefone}
                            onChange={(e) =>
                                handleChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        name: 'telefone',
                                        value: formatPhone(e.target.value),
                                    },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            onKeyDown={handleTelefoneKeyDown}
                        />
                    </div>

                    {error && <p className="cadastro-form__error">{error}</p>}

                    <button
                        className="cadastro-form__submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Criando conta...' : 'Criar conta'}
                    </button>
                </form>

                <p className="cadastro-card__login">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="cadastro-card__login-link">Entrar</Link>
                </p>
            </div>
        </div>
    )
}
