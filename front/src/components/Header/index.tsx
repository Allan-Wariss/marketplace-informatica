

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './style.css'

export const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/home')
    }

    return (
        <header className="header">
            <Link to="/home" className="header__brand">
                Informática Place
            </Link>

            <div className="header__search">
                <input
                    className="header__search-input"
                    type="text"
                    placeholder="Buscar produtos..."
                />
            </div>

            <nav className="header__nav">
                {user ? (
                    <>
                        <span className="header__username">Olá, {user.name}</span>
                        <Link to="/cadastrar-produto" className="header__nav-link header__nav-link--primary">Cadastrar Produto</Link>
                        <button className="header__logout" onClick={handleLogout}>Sair</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="header__nav-link">Entrar</Link>
                        <Link to="/cadastrar" className="header__nav-link header__nav-link--primary">Cadastrar</Link>
                    </>
                )}
            </nav>
        </header>
    )
}