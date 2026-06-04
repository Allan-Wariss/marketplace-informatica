import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import './login.css'

export const Login = () => {
    const { form, loading, error, handleChange, handleSubmit } = useLogin()

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-card__title">Entrar</h1>
                <p className="login-card__subtitle">Acesse sua conta no Marketplace Informática</p>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="login-form__field">
                        <label className="login-form__label" htmlFor="email">E-mail</label>
                        <input
                            className="login-form__input"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="login-form__field">
                        <label className="login-form__label" htmlFor="password">Senha</label>
                        <input
                            className="login-form__input"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="login-form__error">{error}</p>}

                    <button
                        className="login-form__submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className="login-card__register">
                    Não tem uma conta?{' '}
                    <Link to="/cadastrar" className="login-card__register-link">Cadastre-se</Link>
                </p>
            </div>
        </div>
    )
}
