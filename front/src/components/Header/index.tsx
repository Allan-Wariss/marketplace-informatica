

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './style.css'

export const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [inputValue, setInputValue] = useState(() => searchParams.get('q') ?? '')

    const handleLogout = () => {
        logout()
        navigate('/home')
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const q = inputValue.trim()
        if (q) {
            navigate(`/home?q=${encodeURIComponent(q)}&page=0`)
        } else {
            navigate('/home')
        }
    }

    return (
        <header className="header">
            <Link to="/home" className="header__brand">
                Informática Place
            </Link>

            <form className="header__search" onSubmit={handleSearch}>
                <input
                    className="header__search-input"
                    type="text"
                    placeholder="Buscar produtos..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="header__search-btn">Buscar</button>
            </form>

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