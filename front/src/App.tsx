import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Cadastro } from './pages/cadastro'
import { CadastrarProduto } from './pages/cadastrar-produto'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App
